import React, { useState } from "react";
import { User, Lock, ArrowRight } from "lucide-react";

// Recebemos a função 'onLogin' vinda do pai (App)
const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ user: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Passamos o usuário e a senha para a função que veio do App
    onLogin(formData.user, formData.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gray-50 p-8 text-center border-b border-gray-100">
          <div className="flex justify-center items-center gap-2 mb-2">
            <div className="flex flex-col gap-1">
              <span className="w-2 h-2 rounded-full bg-dellut-red"></span>
              <span className="w-2 h-2 rounded-full bg-dellut-red translate-x-1"></span>
              <span className="w-2 h-2 rounded-full bg-dellut-red"></span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
              DELLUT
            </h1>
          </div>
          <p className="text-sm text-gray-500 font-medium tracking-widest">
            ENGENHARIA
          </p>
        </div>

        <div className="p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Acesso ao Sistema
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Usuário"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dellut-red focus:border-transparent transition-all"
                value={formData.user}
                onChange={(e) =>
                  setFormData({ ...formData, user: e.target.value })
                }
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={20} className="text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="Senha"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dellut-red focus:border-transparent transition-all"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="w-full bg-dellut-red hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              Entrar <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
