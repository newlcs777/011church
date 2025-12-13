
import { getMinisterios } from "../services/escalasService";
import MinisterioCard from "../components/MinisterioCard";

export default function MinisteriosList() {
  const ministerios = getMinisterios();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Escalas dos Ministérios</h1>

      <div className="flex flex-col gap-4 mt-4">
        {ministerios.map((m) => (
          <MinisterioCard key={m.id} ministerio={m} />
        ))}
      </div>
    </div>
  );
}
