import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addPerson } from "../store/peopleThunks";
import PersonForm from "../components/PersonForm";

import { notifyLeaderNearestDna } from "@/modules/dna/services/dnaService";

export default function PeopleCreatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(data) {
    try {
      // 1️⃣ salva a pessoa
      const person = await dispatch(addPerson(data)).unwrap();

      // 2️⃣ efeito colateral: notificação do líder do DNA
      try {
        await notifyLeaderNearestDna(person);
      } catch (e) {
        console.warn("Falha ao enviar e-mail do DNA:", e);
      }

      // 3️⃣ navegação
      navigate("/people");
    } catch (err) {
      console.error("Erro ao salvar pessoa:", err);
      alert("Erro ao salvar pessoa");
    }
  }

  return (
    <div
      className="
        flex
        flex-col
        gap-6
        pb-6
      "
    >
      {/* O formulário já tem PageHeader interno */}
      <PersonForm onSubmit={handleSubmit} />
    </div>
  );
}
