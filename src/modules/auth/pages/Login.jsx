
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = login(email, senha);
    if (!ok) {
      setErro("Credenciais inválidas. Verifique email e senha.");
      return;
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-6">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold mb-2">011 Church</h2>
          <p className="text-center text-sm opacity-60 mb-4">
            Acesse com seu usuário da liderança
          </p>

          {erro && (
            <div className="alert alert-error py-2 mb-2">
              <span>{erro}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              placeholder="ex: admin@teste.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Senha"
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>

          <div className="mt-4 text-xs opacity-60">
            <p>Usuários de teste:</p>
            <p>admin@teste.com / admin</p>
            <p>pastor@teste.com / admin</p>
            <p>lider@teste.com / admin</p>
            <p>obreiro@teste.com/admin</p>
            <p>Membro  ana@teste.com/admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
