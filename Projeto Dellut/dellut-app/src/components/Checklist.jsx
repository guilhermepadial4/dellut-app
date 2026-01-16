import React, { useState } from "react";
import {
  Camera,
  Trash2,
  Send,
  LogOut,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const Checklist = ({ user, onLogout }) => {
  const [km, setKm] = useState("");
  const [placa, setPlaca] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);

  // --- CONFIRA SE ESTÁ IGUAL AO SITE ---
  const CLOUD_NAME = "dyzvdmjtg";
  const UPLOAD_PRESET = "dyzvdmjtg";

  const handlePhotoUpload = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const newFiles = Array.from(e.target.files);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setFiles([...files, ...newFiles]);
    setPreviews([...previews, ...newPreviews]);
  };

  const removePhoto = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  // Função de upload com logs detalhados
  const uploadToCloudinary = async (file) => {
    console.log("1. Iniciando upload da foto:", file.name);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      console.log(
        "2. Resposta do Cloudinary recebida. Status:",
        response.status
      );

      if (!response.ok) {
        throw new Error(
          `Erro Cloudinary: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("3. Link gerado:", data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error("ERRO NO UPLOAD:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("--- INICIANDO ENVIO ---");

    if (!km || !placa || files.length === 0) {
      alert("Preencha KM, Placa e tire foto!");
      return;
    }

    setLoading(true);

    try {
      // Passo 1: Fotos
      console.log("Passo 1: Enviando fotos para o Cloudinary...");
      const uploadPromises = files.map((file) => uploadToCloudinary(file));
      const photosUrls = await Promise.all(uploadPromises);
      console.log("Todas as fotos enviadas:", photosUrls);

      // Passo 2: Banco de Dados
      console.log("Passo 2: Salvando no Firebase...");
      await addDoc(collection(db, "vistorias"), {
        km: km,
        placa: placa,
        fotos: photosUrls,
        autor: user,
        data: new Date().toLocaleString("pt-BR"),
        timestamp: new Date(),
      });
      console.log("Passo 2: Sucesso no Firebase!");

      setEnviado(true);
      setTimeout(() => {
        setEnviado(false);
        setKm("");
        setPlaca("");
        setFiles([]);
        setPreviews([]);
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.error("ERRO FINAL:", error);
      alert(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (enviado)
    return (
      <div className="p-10 text-center text-green-600 font-bold">SUCESSO!</div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <header className="bg-white p-4 shadow-sm flex justify-between items-center sticky top-0 z-10">
        <h1 className="font-bold">Teste de Envio</h1>
        <button onClick={onLogout}>
          <LogOut />
        </button>
      </header>
      <main className="p-4 max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="number"
            placeholder="KM"
            value={km}
            onChange={(e) => setKm(e.target.value)}
            className="w-full p-3 border rounded"
          />
          <select
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            className="w-full p-3 border rounded"
          >
            <option value="">Placa</option>
            <option value="1">Final 1</option>
          </select>
          <input
            type="file"
            multiple
            onChange={handlePhotoUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
          />
          <div className="flex gap-2">
            {previews.map((src, i) => (
              <img
                key={i}
                src={src}
                className="w-16 h-16 object-cover rounded"
              />
            ))}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white p-4 rounded font-bold"
          >
            {loading ? "Testando..." : "Testar Envio"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Checklist;
