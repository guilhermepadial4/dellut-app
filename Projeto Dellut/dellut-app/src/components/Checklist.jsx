import React from "react";

const Checklist = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-800">Olá, {user}</h1>
          <button
            onClick={onLogout}
            className="text-sm text-dellut-red hover:underline"
          >
            Sair
          </button>
        </div>
        <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
          🚧 Formulário de Vistoria virá aqui
        </div>
      </div>
    </div>
  );
};

export default Checklist;
