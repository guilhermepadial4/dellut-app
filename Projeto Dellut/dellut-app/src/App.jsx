import { useState } from "react";
import Login from "./components/Login";
import Checklist from "./components/Checklist";
import Admin from "./components/Admin";

function App() {
  // Estado para saber quem está logado (null = ninguém)
  const [user, setUser] = useState(null);

  // Função que será chamada quando o formulário de Login for enviado
  const handleLogin = (username, password) => {
    // Validação simples (mock)
    if (!username || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    // Aqui definimos quem entrou
    setUser(username.toLowerCase());
  };

  // Função para sair
  const handleLogout = () => {
    setUser(null);
  };

  // Lógica de Roteamento (Renderização Condicional)
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  if (user === "admin") {
    return <Admin onLogout={handleLogout} />;
  }

  return <Checklist user={user} onLogout={handleLogout} />;
}

export default App;
