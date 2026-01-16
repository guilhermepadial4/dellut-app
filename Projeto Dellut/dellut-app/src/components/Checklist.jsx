import React, { useState } from "react";
import {
  Camera,
  Trash2,
  Send,
  LogOut,
  CheckCircle,
  Loader2,
} from "lucide-react"; // Adicionei Loader2
import { db } from "../firebase"; // Importa o banco de dados
import { collection, addDoc } from "firebase/firestore"; // Importa funções de salvar

const Checklist = ({ user, onLogout }) => {
  const [km, setKm] = useState("");
  const [placa, setPlaca] = useState("");

  // Mudamos para controlar Arquivos (upload) e Previews (visual) separadamente
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [loading, setLoading] = useState(false); // Estado para travar botão enquanto envia
  const [enviado, setEnviado] = useState(false);

  // --- SUAS CHAVES DO CLOUDINARY ---
  const CLOUD_NAME = "dyzvdmjtg";
  const UPLOAD_PRESET = "dyzvdmjtg";

  // Lógica para processar as fotos selecionadas
  const handlePhotoUpload = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const newFiles = Array.from(e.target.files);

    // Cria URLs temporárias apenas para mostrar na tela agora
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

    setFiles([...files, ...newFiles]);
    setPreviews([...previews, ...newPreviews]);
  };import React, { useState } from "react";
import { Camera, Trash2, Send, LogOut, CheckCircle, Loader2 } from "lucide-react";
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

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
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData
        });

        console.log("2. Resposta do Cloudinary recebida. Status:", response.status);

        if (!response.ok) {
            throw new Error(`Erro Cloudinary: ${response.status} ${response.statusText}`);
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
        const uploadPromises = files.map(file => uploadToCloudinary(file));
        const photosUrls = await Promise.all(uploadPromises);
        console.log("Todas as fotos enviadas:", photosUrls);

        // Passo 2: Banco de Dados
        console.log("Passo 2: Salvando no Firebase...");
        await addDoc(collection(db, "vistorias"), {
            km: km,
            placa: placa,
            fotos: photosUrls,
            autor: user,
            data: new Date().toLocaleString('pt-BR'),
            timestamp: new Date()
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

  if (enviado) return <div className="p-10 text-center text-green-600 font-bold">SUCESSO!</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <header className="bg-white p-4 shadow-sm flex justify-between items-center sticky top-0 z-10">
        <h1 className="font-bold">Teste de Envio</h1>
        <button onClick={onLogout}><LogOut /></button>
      </header>
      <main className="p-4 max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
            <input type="number" placeholder="KM" value={km} onChange={e=>setKm(e.target.value)} className="w-full p-3 border rounded" />
            <select value={placa} onChange={e=>setPlaca(e.target.value)} className="w-full p-3 border rounded"><option value="">Placa</option><option value="1">Final 1</option></select>
            <input type="file" multiple onChange={handlePhotoUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"/>
            <div className="flex gap-2">{previews.map((src, i) => <img key={i} src={src} className="w-16 h-16 object-cover rounded" />)}</div>
            <button type="submit" disabled={loading} className="w-full bg-red-600 text-white p-4 rounded font-bold">{loading ? "Testando..." : "Testar Envio"}</button>
        </form>
      </main>
    </div>
  );
};

export default Checklist;

  // Remover uma foto específica
  const removePhoto = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
    setPreviews(previews.filter((_, index) => index !== indexToRemove));
  };

  // Função que manda a foto para o Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data.secure_url; // Retorna o link da imagem na internet
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!km || !placa) {
      alert("Preencha o KM e a Placa!");
      return;
    }

    if (files.length === 0) {
      alert("É necessário tirar pelo menos uma foto!");
      return;
    }

    setLoading(true); // Ativa o carregamento

    try {
      // 1. Envia as fotos para o Cloudinary e espera os links voltarem
      const uploadPromises = files.map((file) => uploadToCloudinary(file));
      const photosUrls = await Promise.all(uploadPromises);

      // 2. Salva os dados no Firebase com os links das fotos
      await addDoc(collection(db, "vistorias"), {
        km: km,
        placa: placa,
        fotos: photosUrls,
        autor: user,
        data: new Date().toLocaleString("pt-BR"),
        timestamp: new Date(),
      });

      // 3. Sucesso!
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
      console.error("Erro ao enviar:", error);
      alert("Erro ao enviar. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  // Se acabou de enviar, mostra tela de sucesso
  if (enviado) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6 text-center animate-pulse">
        <CheckCircle size={64} className="text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Vistoria Enviada!</h2>
        <p className="text-gray-600 mt-2">Os dados foram salvos com sucesso.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header Mobile */}
      <header className="bg-white p-4 shadow-sm flex justify-between items-center sticky top-0 z-10">
        <div>
          <h1 className="font-bold text-gray-800 text-lg">Nova Vistoria</h1>
          <p className="text-xs text-gray-500">Colaborador: {user}</p>
        </div>
        <button
          onClick={onLogout}
          className="p-2 text-gray-400 hover:text-dellut-red"
        >
          <LogOut size={20} />
        </button>
      </header>

      <main className="p-4 max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card Dados do Carro */}
          <div className="bg-white p-5 rounded-xl shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-dellut-red uppercase tracking-wider">
              Dados do Veículo
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                KM Atual
              </label>
              <input
                type="number"
                placeholder="Ex: 45000"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-dellut-red outline-none text-lg"
                value={km}
                onChange={(e) => setKm(e.target.value)}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Final da Placa
              </label>
              <select
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-dellut-red outline-none bg-white"
                value={placa}
                onChange={(e) => setPlaca(e.target.value)}
                disabled={loading}
              >
                <option value="" disabled>
                  Selecione...
                </option>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <option key={num} value={num}>
                    Final {num}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Área de Fotos */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-dellut-red uppercase tracking-wider">
                Evidências
              </h3>
              <span className="text-xs text-gray-400">
                {previews.length} fotos adicionadas
              </span>
            </div>

            {/* Botão de Câmera Customizado */}
            <label
              className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                loading
                  ? "bg-gray-100 border-gray-300"
                  : "border-gray-300 hover:bg-gray-50 hover:border-dellut-red"
              }`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Camera size={32} className="text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 font-medium">
                  {loading ? "Aguarde..." : "Toque para tirar foto"}
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                disabled={loading}
              />
            </label>

            {/* Grid de Preview */}
            {previews.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {previews.map((photo, index) => (
                  <div key={index} className="relative aspect-square group">
                    <img
                      src={photo}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                    {!loading && (
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-90 shadow-sm"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Botão Enviar */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-bold py-4 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 text-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-dellut-red hover:bg-red-700"
            }`}
          >
            {loading ? (
              <Loader2 size={24} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
            {loading ? "Enviando..." : "Enviar Checklist"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Checklist;
