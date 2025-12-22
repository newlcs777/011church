import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { FaTrash } from "react-icons/fa";

export default function PersonCardEdit({
  person,
  onSave,
  onDelete,
  onCancel,
}) {
  if (!person) return null;

  const [form, setForm] = useState({
    nome: person.nome || "",
    telefone: person.telefone || "",
    observacao: person.observacao || "",
    tipo: person.tipo || "",
    endereco: {
      texto: person.endereco?.texto || "",
      numero: person.endereco?.numero || "",
      cep: person.endereco?.cep || "",
      cidade: person.endereco?.cidade || "",
      estado: person.endereco?.estado || "",
    },
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleEnderecoChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      endereco: {
        ...prev.endereco,
        [name]: value,
      },
    }));
  }

  function handleSave() {
    const payload = {
      nome: form.nome?.trim() || person.nome || "",
      telefone: form.telefone?.trim() || person.telefone || "",
      observacao:
        form.observacao?.trim() || person.observacao || "",
      tipo: form.tipo || person.tipo || "",
      endereco: {
        texto:
          form.endereco.texto?.trim() ||
          person.endereco?.texto ||
          "",
        numero:
          form.endereco.numero?.trim() ||
          person.endereco?.numero ||
          "",
        cep:
          form.endereco.cep?.trim() ||
          person.endereco?.cep ||
          "",
        cidade:
          form.endereco.cidade?.trim() ||
          person.endereco?.cidade ||
          "",
        estado:
          form.endereco.estado?.trim() ||
          person.endereco?.estado ||
          "",
      },
    };

    onSave({
      id: person.id,
      data: payload,
    });
  }

  return (
    <div
      className="
        flex
        flex-col
        gap-4          /* mobile mais compacto */
        sm:gap-6       /* desktop confortável */
      "
    >
      {/* INFORMAÇÕES DA PESSOA */}
      <section
        className="
          flex
          flex-col
          gap-3
          sm:gap-4
        "
      >
        <h3 className="text-base font-semibold">
          Informações da pessoa
        </h3>

        <Input
          name="nome"
          label="Nome"
          value={form.nome}
          onChange={handleChange}
        />

        <Input
          name="telefone"
          label="WhatsApp"
          value={form.telefone}
          onChange={handleChange}
        />

        <textarea
          name="observacao"
          value={form.observacao}
          onChange={handleChange}
          rows={3}
          placeholder="Observação"
          className="
            w-full
            rounded-lg
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
          flex
          flex-col
          gap-3
          sm:gap-4
        "
      >
        <h3 className="text-base font-semibold">
          Localização
        </h3>

        <Input
          name="texto"
          label="Endereço completo"
          value={form.endereco.texto}
          onChange={handleEnderecoChange}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Input
            name="numero"
            label="Número"
            value={form.endereco.numero}
            onChange={handleEnderecoChange}
          />

          <Input
            name="cep"
            label="CEP"
            value={form.endereco.cep}
            onChange={handleEnderecoChange}
          />

          <Input
            name="cidade"
            label="Cidade"
            value={form.endereco.cidade}
            onChange={handleEnderecoChange}
          />

          <Input
            name="estado"
            label="UF"
            value={form.endereco.estado}
            onChange={handleEnderecoChange}
          />
        </div>
      </section>

      {/* AÇÕES */}
      <div
        className="
          flex
          flex-col-reverse
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-2
          pt-1
        "
      >
        {/* EXCLUIR */}
        <Button
          variant="ghost"
          onClick={onDelete}
          className="
            flex
            items-center
            gap-2
            text-sm
            text-error
            self-start
            sm:self-auto
          "
        >
          <FaTrash size={14} />
          Excluir
        </Button>

        {/* AÇÕES PRINCIPAIS */}
        <div
          className="
            flex
            flex-col
            sm:flex-row
            gap-2
            w-full
            sm:w-auto
          "
        >
          <Button
            variant="ghost"
            onClick={onCancel}
            className="w-full sm:w-auto"
          >
            Cancelar
          </Button>

          <Button
            variant="ghost"
            onClick={handleSave}
            className="w-full sm:w-auto"
          >
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
}
