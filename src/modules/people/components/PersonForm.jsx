import { useState } from "react";

import PageHeader from "@/components/ui/PageHeader";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function PersonForm({ onSubmit }) {
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    enderecoTexto: "",
    numero: "",
    cep: "",
    cidade: "",
    estado: "",
    tipo: "visitante",
    observacao: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.nome || !form.cep || !form.cidade || !form.estado) {
      alert(
        "Preencha nome, CEP, cidade e estado para salvar."
      );
      return;
    }

    onSubmit({
      nome: form.nome.trim(),
      telefone: form.telefone.trim(),
      tipo: form.tipo,
      observacao: form.observacao.trim(),

      endereco: {
        texto: form.enderecoTexto.trim(),
        numero: form.numero.trim(),
        cep: form.cep.trim(),
        cidade: form.cidade.trim(),
        estado: form.estado.trim(),
      },
    });
  }

  return (
    <div className="flex flex-col gap-6 pb-6">
      <PageHeader
        title="Cadastrar visitante"
        subtitle="Essas informações nos ajudam a direcionar a pessoa ao DNA mais próximo."
      />

      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-md
          mx-auto
          flex
          flex-col
          gap-4
          sm:gap-8
        "
      >
        {/* INFORMAÇÕES DA PESSOA */}
        <section
          className="
            bg-base-100
            rounded-2xl
            p-4
            sm:p-6
            flex
            flex-col
            gap-4
            sm:gap-5
          "
        >
          <h3 className="text-base font-semibold">
            Informações da pessoa
          </h3>

          <Input
            label="Nome"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />

          <Input
            label="WhatsApp"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
          />

          <textarea
            name="observacao"
            value={form.observacao}
            onChange={handleChange}
            rows={2}
            placeholder="Observação pastoral ou administrativa"
            className="
              rounded-xl
              border
              border-base-300
              bg-base-100
              px-3
              py-2
              text-sm
              resize-none
              focus:outline-none
              focus:ring-2
              focus:ring-primary/40
            "
          />
        </section>

        {/* LOCALIZAÇÃO */}
        <section
          className="
            bg-base-100
            rounded-2xl
            p-4
            sm:p-6
            flex
            flex-col
            gap-4
            sm:gap-5
          "
        >
          <h3 className="text-base font-semibold">
            Localização
          </h3>

          <Input
            label="Endereço completo"
            name="enderecoTexto"
            placeholder="Rua, bairro"
            value={form.enderecoTexto}
            onChange={handleChange}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <Input
              label="Número"
              name="numero"
              value={form.numero}
              onChange={handleChange}
            />

            <Input
              label="CEP"
              name="cep"
              placeholder="00000-000"
              value={form.cep}
              onChange={handleChange}
              required
            />

            <Input
              label="Cidade"
              name="cidade"
              value={form.cidade}
              onChange={handleChange}
              required
            />

            <Input
              label="UF"
              name="estado"
              placeholder="UF"
              value={form.estado}
              onChange={handleChange}
              required
            />
          </div>
        </section>

        {/* IDENTIFICAÇÃO */}
        <section
          className="
            bg-base-100
            rounded-2xl
            p-4
            sm:p-6
            flex
            flex-col
            gap-3
            sm:gap-5
          "
        >
          <label className="text-sm font-medium">
            Como essa pessoa se identifica hoje?
          </label>

          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="
              h-11
              rounded-xl
              border
              border-base-300
              bg-base-100
              px-3
              text-sm
              focus:outline-none
              focus:ring-2
              focus:ring-primary/40
            "
          >
            <option value="visitante">Visitante</option>
            <option value="novo_convertido">
              Novo convertido
            </option>
            <option value="membro">Membro</option>
          </select>
        </section>

        {/* AÇÃO */}
        <div className="flex justify-center pt-1">
          <Button type="submit" variant="ghost" className="px-6">
            Salvar visitante
          </Button>
        </div>
      </form>
    </div>
  );
}
