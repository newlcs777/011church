import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { authUsers } from "../mocks/authUsers";

const AuthContext = createContext();

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
    const found = authUsers.find(
      (u) =>
        u.email === email &&
        u.senha === senha
    );

    if (!found) return false;

    const loggedUser = {
      id: found.id,
      nome: found.nome,
      email: found.email,
      role: found.role,
    };

    setUser(loggedUser);
    localStorage.setItem(
      "011church-user",
      JSON.stringify(loggedUser)
    );

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("011church-user");
  };

  // 🔥 Evita tela branca durante carregamento
  if (loading) {
    return (
      <div style={{ color: "white", padding: 40 }}>
        Carregando usuário...
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () =>
  useContext(AuthContext);
