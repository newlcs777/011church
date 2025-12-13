
import { getMusicas } from "../services/louvorService";
import MusicaCard from "../components/MusicaCard";

export default function LouvorList() {
  const musicas = getMusicas();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Louvor</h1>
      <p className="opacity-70">Lista de músicas utilizadas nos cultos.</p>

      <div className="flex flex-col gap-4 mt-4">
        {musicas.map((m) => (
          <MusicaCard key={m.id} musica={m} />
        ))}
      </div>
    </div>
  );
}
