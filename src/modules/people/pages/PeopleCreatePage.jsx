import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addPerson } from "../store/peopleThunks";
import PersonForm from "../components/PersonForm";

// 👉 importar APENAS a função do dnaService
import { notifyLeaderNearestDna } from "@/modules/dna/services/dnaService";

export default function PeopleCreatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(data) {
    try {
      // 1️⃣ salva a pessoa (igual hoje)
      const person = await dispatch(addPerson(data)).unwrap();

      // 2️⃣ efeito colateral: e-mail automático (não quebra se falhar)
      try {
        await notifyLeaderNearestDna(person);
      } catch (e) {
        console.warn("Falha ao enviar e-mail do DNA:", e);
      }

      // 3️⃣ navega (igual hoje)
      navigate("/people");
    } catch (err) {
      console.error("Erro ao salvar pessoa:", err);
      alert("Erro ao salvar pessoa");
    }
  }

  return <PersonForm onSubmit={handleSubmit} />;
}
