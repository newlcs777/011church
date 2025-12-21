import { useState } from "react";
import { useNearestDna } from "../hooks/useNearestDna";

import PersonCardView from "./PersonCardView";
import PersonCardEdit from "./PersonCardEdit";

export default function PersonCard({ person, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    nome: person.nome,
    telefone: person.telefone || "",
    observacao: person.observacao || "",
    tipo: person.tipo,
  });

  const [enderecoForm, setEnderecoForm] = useState({
    texto: person.endereco?.texto || "",
    numero: person.endereco?.numero || "",
    cep: person.endereco?.cep || "",
    cidade: person.endereco?.cidade || "",
    estado: person.endereco?.estado || "",
  });

  const nearestDna = useNearestDna(person);

  const whatsappLink =
    person.telefone &&
    `https://wa.me/55${person.telefone.replace(/\D/g, "")}`;

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleEnderecoChange(e) {
    setEnderecoForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSave() {
    onUpdate({
      id: person.id,
      data: {
        nome: form.nome.trim(),
        telefone: form.telefone.trim(),
        observacao: form.observacao.trim(),
        tipo: form.tipo,
        endereco: {
          texto: enderecoForm.texto.trim(),
          numero: enderecoForm.numero.trim(),
          cep: enderecoForm.cep.trim(),
          cidade: enderecoForm.cidade.trim(),
          estado: enderecoForm.estado.trim(),
        },
      },
    });

    setEditing(false);
  }

  return (
    <div
      className="
        group
        rounded-2xl
        bg-base-100
        border
        border-base-300
        p-6
        flex
        flex-col
        gap-4
        shadow-sm
        transition
        hover:shadow-md
      "
    >
      {!editing ? (
        <PersonCardView
          person={person}
          nearestDna={nearestDna}
          whatsappLink={whatsappLink}
          onEdit={() => setEditing(true)}
        />
      ) : (
        <PersonCardEdit
          form={form}
          enderecoForm={enderecoForm}
          onChange={handleChange}
          onEnderecoChange={handleEnderecoChange}
          onSave={handleSave}
          onCancel={() => setEditing(false)}
          onDelete={() => onDelete(person.id)}
        />
      )}
    </div>
  );
}
