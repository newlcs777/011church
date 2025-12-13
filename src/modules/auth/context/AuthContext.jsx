import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const defaultUsers = [
  { id: 1, nome: "Admin Master", email: "admin@teste.com", role: "admin", senha: "admin" },
  { id: 2, nome: "Pastor João", email: "pastor@teste.com", role: "pastor", senha: "admin" },
  { id: 3, nome: "Líder Maria", email: "lider@teste.com", role: "lider", senha: "admin" },
  { id: 4, nome: "Obreiro Pedro", email: "obreiro@teste.com", role: "obreiro", senha: "admin" }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carrega usuário salvo
  useEffect(() => {
    try {
      const saved = localStorage.getItem("011church-user");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.email) {
          setUser(parsed);
        }
      }
    } catch {
      localStorage.removeItem("011church-user");
    }

    setLoading(false);
  }, []);

  const login = (email, senha) => {
    const found = defaultUsers.find(u => u.email === email && u.senha === senha);
    if (!found) return false;

    setUser(found);
    localStorage.setItem("011church-user", JSON.stringify(found));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("011church-user");
  };

  // 🔥 AQUI ESTÁ A CORREÇÃO QUE IMPEDE TELA BRANCA
  if (loading) {
    return (
      <div style={{ color: "white", padding: 40 }}>
        Carregando usuário...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
