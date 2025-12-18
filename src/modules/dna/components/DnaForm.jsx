// modules/dna/components/DnaForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { geocodeAddress } from "../services/geoService";

export default function DnaForm({
  initialData,
  onSubmit,
  isSubmitting = false,
}) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: initialData?.nome || "",
    liderNome: initialData?.liderNome || "",
    liderWhatsapp: initialData?.liderWhatsapp || "",
    dia: initialData?.dia || "",
    horario: initialData?.horario || "",
    endereco: initialData?.endereco || "",
    cep: initialData?.cep || "",
  });

  const [loadingGeo, setLoadingGeo] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
  e.preventDefault();

  if (
    !form.nome ||
    !form.liderNome ||
    !form.liderWhatsapp ||
    !form.dia ||
    !form.horario ||
    !form.endereco ||
    !form.cep
  ) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  setLoadingGeo(true);

  const fullAddress = `${form.endereco}, ${form.cep}, São Paulo, SP, Brasil`;

  let location = null;

  try {
    location = await geocodeAddress(fullAddress);
  } catch (err) {
    console.warn("Geocode indisponível, salvando sem localização.");
  }

  setLoadingGeo(false);

  // ✅ SALVA SEMPRE
  onSubmit({
  ...form,
  whatsapp: form.liderWhatsapp, // ✅ adiciona sem quebrar nada
  location: location || null,
});

}


  return (
    <div className="relative">
      {/* VOLTAR – SUPERIOR DIREITO */}
      <div className="absolute right-0 top-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
        >
          Voltar
        </Button>
      </div>

      {/* FORMULÁRIO */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 pt-10"
      >
        <Input
          name="nome"
          label="Nome do DNA"
          value={form.nome}
          onChange={handleChange}
          required
        />

        <Input
          name="liderNome"
          label="Nome do líder"
          value={form.liderNome}
          onChange={handleChange}
          required
        />

        <Input
          name="liderWhatsapp"
          label="WhatsApp do líder"
          placeholder="Ex: (11) 91234-5678"
          value={form.liderWhatsapp}
          onChange={handleChange}
          required
        />

        <Input
          name="dia"
          label="Dia do encontro"
          value={form.dia}
          onChange={handleChange}
          required
        />

        <Input
          name="horario"
          label="Horário"
          value={form.horario}
          onChange={handleChange}
          required
        />

        <Input
          name="endereco"
          label="Endereço completo"
          value={form.endereco}
          onChange={handleChange}
          required
        />

        <Input
          name="cep"
          label="CEP"
          value={form.cep}
          onChange={handleChange}
          required
        />

        {/* SALVAR – CENTRO EM BAIXO */}
        <div className="flex justify-center pt-6">
          <Button
            type="submit"
            variant="ghost"
            disabled={isSubmitting || loadingGeo}
          >
            {loadingGeo ? "Localizando endereço..." : "Salvar DNA"}
          </Button>
        </div>
      </form>
    </div>
  );
}
