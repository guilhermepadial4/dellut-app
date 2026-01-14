import React, { useState } from "react";
import { LogOut, Calendar, User, Truck, X, ZoomIn } from "lucide-react";

const Admin = ({ onLogout, vistorias }) => {
  // Estado para controlar qual imagem está aberta no modal (null = nenhuma)
  const [selectedImage, setSelectedImage] = useState(null);

  // Função para fechar o modal
  const closeModal = () => setSelectedImage(null);

  return (
    // Adicionamos 'relative' aqui para garantir o contexto do modal
    <div className="min-h-screen bg-gray-50 pb-10 relative">
      {/* --- Header e Resumo (KPIs) permanecem iguais --- */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-dellut-red rounded-full"></span>
            <h1 className="text-xl font-bold text-gray-800">
              Painel de Controle
            </h1>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-dellut-red transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
          >
            <LogOut size={18} /> Sair
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-dellut-red">
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">
              Vistorias Hoje
            </h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {vistorias.length}
            </p>
          </div>
        </div>

        <h2 className="text-lg font-bold text-gray-700 mb-4">
          Últimos Registros
        </h2>

        {vistorias.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-dashed border-gray-300">
            <Truck size={32} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">
              Nenhuma vistoria recebida
            </h3>
            <p className="text-gray-500 mt-1">
              Os checklists enviados aparecerão aqui.
            </p>
          </div>
        )}

        <div className="space-y-6">
          {vistorias.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            >
              {/* Cabeçalho do Card */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-200">
                    <User size={14} className="text-dellut-red" />{" "}
                    <span className="font-semibold">{item.autor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar size={14} /> {item.data}
                  </div>
                </div>
                <span className="text-xs font-mono text-gray-400">
                  ID: {item.id}
                </span>
              </div>

              {/* Conteúdo do Card */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-xs text-gray-500 font-bold mb-1">KM</p>
                    <p className="text-lg font-medium">{item.km} km</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold mb-1">
                      Placa
                    </p>
                    <p className="text-lg font-medium">Final {item.placa}</p>
                  </div>
                </div>

                {/* Galeria de Fotos Atualizada */}
                <div>
                  <p className="text-xs text-gray-500 font-bold mb-3">
                    Evidências ({item.fotos.length})
                  </p>

                  {/* Mudamos de <a> para uma <div> clicável */}
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin cursor-pointer">
                    {item.fotos.map((foto, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedImage(foto)} // Ao clicar, define esta imagem como selecionada
                        className="shrink-0 relative group w-24 h-24 rounded-lg overflow-hidden border border-gray-200 hover:border-dellut-red transition-all"
                      >
                        <img
                          src={foto}
                          alt={`Evidência ${index + 1}`}
                          className="w-full h-full object-cover"
                        />

                        {/* Ícone de zoom no hover */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center text-white opacity-0 group-hover:opacity-100">
                          <ZoomIn size={20} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ================= MODAL (LIGHTBOX) ================= */}
      {/* Só renderiza se tiver uma imagem selecionada */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90 backdrop-blur-sm transition-opacity animate-fade-in"
          onClick={closeModal} // Fecha ao clicar no fundo escuro
        >
          {/* Botão de Fechar (X) no topo direito */}
          <button
            onClick={closeModal}
            className="absolute top-5 right-5 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-dellut-red transition-colors"
          >
            <X size={32} />
          </button>

          {/* A Imagem Grande */}
          <img
            src={selectedImage}
            alt="Evidência ampliada"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Impede que clicar na imagem feche o modal
          />
        </div>
      )}
      {/* ================= FIM DO MODAL ================= */}
    </div>
  );
};

export default Admin;
