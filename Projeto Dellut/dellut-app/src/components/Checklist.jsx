import React, { useState } from "react";
import { Camera, Trash2, Send, LogOut, CheckCircle } from "lucide-react";

const Checklist = ({ user, onLogout, onSave }) => {
  const [km, setKm] = useState("");
  const [placa, setPlaca] = useState("");
  const [photos, setPhotos] = useState([]); // Guarda as URLs das imagens para preview
  const [enviado, setEnviado] = useState(false); // Feedback visual de sucesso

  // Lógica para processar as fotos selecionadas
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);

    // Cria URLs temporárias para mostrar o preview
    const newPhotos = files.map((file) => URL.createObjectURL(file));

    setPhotos([...photos, ...newPhotos]);
  };

  // Remover uma foto específica da lista
  const removePhoto = (indexToRemove) => {
    setPhotos(photos.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!km || !placa) {
      alert("Preencha o KM e a Placa!");
      return;
    }

    if (photos.length === 0) {
      alert("É necessário tirar pelo menos uma foto!");
      return;
    }

    // Envia os dados para o App.jsx
    onSave({
      km,
      placa,
      fotos: photos,
    });

    // Mostra mensagem de sucesso e limpa o form
    setEnviado(true);
    setTimeout(() => {
      setEnviado(false);
      setKm("");
      setPlaca("");
      setPhotos([]);
    }, 3000);
  };

  // Se acabou de enviar, mostra tela de sucesso
  if (enviado) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6 text-center">
        <CheckCircle size={64} className="text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Vistoria Enviada!</h2>
        <p className="text-gray-600 mt-2">Os dados foram salvos com sucesso.</p>
        <button
          onClick={() => setEnviado(false)}
          className="mt-8 text-green-700 font-bold underline"
        >
          Voltar
        </button>
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
                {photos.length} fotos adicionadas
              </span>
            </div>

            {/* Botão de Câmera Customizado */}
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-dellut-red transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Camera size={32} className="text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 font-medium">
                  Toque para tirar foto
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
              />
            </label>

            {/* Grid de Preview */}
            {photos.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative aspect-square group">
                    <img
                      src={photo}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-90 shadow-sm"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Botão Enviar */}
          <button
            type="submit"
            className="w-full bg-dellut-red text-white font-bold py-4 rounded-xl shadow-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 text-lg"
          >
            <Send size={20} />
            Enviar Checklist
          </button>
        </form>
      </main>
    </div>
  );
};

export default Checklist;
