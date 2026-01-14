import { useState } from "react";
import Login from "./components/Login";
import Checklist from "./components/Checklist";
import Admin from "./components/Admin";

function App() {
  const [user, setUser] = useState(null);

  // Estado para guardar todas as vistorias (nosso "Banco de Dados" temporário)
  const [vistorias, setVistorias] = useState([]);

  const handleLogin = (username, password) => {
    if (!username || !password) {
      alert("Preencha todos os campos!");
      return;
    }
    setUser(username.toLowerCase());
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Função que o Checklist vai chamar quando clicar em "Enviar"
  const handleSaveVistoria = (novaVistoria) => {
    const dadosCompletos = {
      ...novaVistoria,
      id: Date.now(), // ID único baseado no tempo
      autor: user,
      data: new Date().toLocaleString("pt-BR"),
    };

    // Adiciona a nova vistoria no topo da lista
    setVistorias([dadosCompletos, ...vistorias]);

    console.log("Vistorias salvas:", [dadosCompletos, ...vistorias]);
  };

  // Roteamento
  if (!user) return <Login onLogin={handleLogin} />;

  // Passamos a lista de vistorias para o Admin ver
  if (user === "admin")
    return <Admin vistorias={vistorias} onLogout={handleLogout} />;

  // Passamos a função de salvar para o Checklist usar
  return (
    <Checklist
      user={user}
      onLogout={handleLogout}
      onSave={handleSaveVistoria}
    />
  );
}

export default App;
