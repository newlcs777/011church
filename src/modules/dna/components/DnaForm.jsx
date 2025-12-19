// modules/dna/components/DnaForm.jsx
import { useState, useEffect } from "react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { geocodeAddress } from "../services/geoService";

export default function DnaForm({
  initialData,
  onSubmit,
  isSubmitting = false,
}) {
  const [form, setForm] = useState({
    nome: "",
    liderNome: "",
    liderWhatsapp: "",
    dia: "",
    horario: "",
    endereco: "",
    cep: "",
  });

  const [loadingGeo, setLoadingGeo] = useState(false);

  // ✅ Preenche o formulário ao editar
  useEffect(() => {
    if (!initialData) return;

    setForm({
      nome: initialData.nome || "",
      liderNome: initialData.liderNome || "",
      liderWhatsapp: initialData.liderWhatsapp || "",
      dia: initialData.dia || "",
      horario: initialData.horario || "",
      endereco: initialData.endereco || "",
      cep: initialData.cep || "",
    });
  }, [initialData]);

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
    } catch {
      console.warn("Geocode indisponível, salvando sem localização.");
    }

    setLoadingGeo(false);

    onSubmit({
      ...form,
      whatsapp: form.liderWhatsapp,
      location: location || null,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        max-w-md
        mx-auto
        flex
        flex-col
        gap-8
      "
    >
      {/* INFORMAÇÕES DO DNA */}
      <section
        className="
          bg-base-100
          rounded-2xl
          p-6
          flex
          flex-col
          gap-5
        "
      >
        <h3
          className="
            text-base
            font-semibold
          "
        >
          Informações do DNA
        </h3>

        <Input
          name="nome"
          label="Nome do DNA"
          placeholder="Ex: Capão Redondo"
          value={form.nome}
          onChange={handleChange}
          required
        />

        <Input
          name="liderNome"
          label="Nome do líder"
          placeholder="Ex: João da Silva"
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

        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
          "
        >
          <Input
            name="dia"
            label="Dia do encontro"
            placeholder="Ex: Quarta-feira"
            value={form.dia}
            onChange={handleChange}
            required
          />

          <Input
            name="horario"
            label="Horário"
            placeholder="Ex: 20:00"
            value={form.horario}
            onChange={handleChange}
            required
          />
        </div>
      </section>

      {/* LOCALIZAÇÃO */}
      <section
        className="
          bg-base-100
          rounded-2xl
          p-6
          flex
          flex-col
          gap-5
        "
      >
        <h3
          className="
            text-base
            font-semibold
          "
        >
          Localização
        </h3>

        <Input
          name="endereco"
          label="Endereço completo"
          placeholder="Rua, número, bairro"
          value={form.endereco}
          onChange={handleChange}
          required
        />

        <Input
          name="cep"
          label="CEP"
          placeholder="Ex: 05890-000"
          value={form.cep}
          onChange={handleChange}
          required
        />
      </section>

      {/* AÇÃO */}
      <div
        className="
          flex
          justify-center
          pt-2
        "
      >
        <Button
          type="submit"
          variant="ghost"
          disabled={isSubmitting || loadingGeo}
          className="
            px-6
          "
        >
          {loadingGeo
            ? "Localizando endereço..."
            : "Salvar DNA"}
        </Button>
      </div>
    </form>
  );
}
