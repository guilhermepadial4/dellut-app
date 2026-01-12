import React from "react";

const Admin = ({ onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-dellut-red">
            Painel Administrativo
          </h1>
          <button
            onClick={onLogout}
            className="px-4 py-2 border border-dellut-red text-dellut-red rounded hover:bg-red-50"
          >
            Sair
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-dellut-red">
            <h3 className="text-gray-500 text-sm">Vistorias Hoje</h3>
            <p className="text-2xl font-bold">0</p>
          </div>
          {/* Mais cards virão depois */}
        </div>
      </div>
    </div>
  );
};

export default Admin;
