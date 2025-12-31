import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    setErro(null);
    setLoading(true);

    const ok = login(email, senha);

    if (!ok) {
      setErro(
        "Não foi possível acessar. Verifique seus dados ou procure a liderança."
      );
      setLoading(false);
      return;
    }

    navigate("/");
  }

  return (
    <div
      className="
        relative
        w-full
        max-w-[340px]
        bg-neutral-900/70
        backdrop-blur-xl
        border
        border-white/10
        rounded-xl
        shadow-xl
        px-6
        py-5
        text-white

        before:absolute
        before:left-0
        before:top-4
        before:bottom-4
        before:w-[2px]
        before:bg-primary/60
        before:rounded-full
      "
    >
      {/* TÍTULO */}
      <h2 className="text-base font-semibold mb-1">
        Área da Liderança
      </h2>

      <p className="text-xs text-white/60 mb-4">
        Acesso restrito para servir e cuidar do ministério
      </p>

      {/* ERRO */}
      {erro && (
        <div className="alert alert-error py-1.5 mb-3 text-xs">
          {erro}
        </div>
      )}

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3"
      >
        <Input
          label="E-mail"
          type="email"
          placeholder="Seu e-mail"
          className="
            h-9
            px-3
            text-sm
            bg-white/10
            border-white/10
            text-white
            placeholder:text-white/40
            focus:border-primary
            focus:ring-0
          "
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErro(null);
          }}
          required
        />

        <Input
          label="Senha"
          type="password"
          placeholder="Sua senha"
          className="
            h-9
            px-3
            text-sm
            bg-white/10
            border-white/10
            text-white
            placeholder:text-white/40
            focus:border-primary
            focus:ring-0
          "
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value);
            setErro(null);
          }}
          required
        />

        <Button
          type="submit"
          disabled={loading}
          className="
            w-full
            h-8
            text-sm
            font-medium
            bg-primary/80
            hover:bg-primary
            transition
            mt-1
            disabled:opacity-60
          "
        >
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      {/* AJUDA */}
      <p className="mt-4 text-[11px] text-white/45 text-center leading-snug">
        Em caso de dificuldade no acesso,
        procure a liderança responsável.
      </p>
    </div>
  );
}
