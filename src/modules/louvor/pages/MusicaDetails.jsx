
import { Link, useParams } from "react-router-dom";
import { getMusica } from "../services/louvorService";

export default function MusicaDetails() {
  const { id } = useParams();
  const musica = getMusica(id);

  if (!musica) return <p className="p-4">Música não encontrada.</p>;

  return (
    <div className="flex flex-col gap-4">
      <Link to="/louvor" className="btn btn-outline btn-sm w-24">
        ← Voltar
      </Link>

      <h1 className="text-2xl font-bold">{musica.titulo}</h1>
      <p>
        <b>Ministro:</b> {musica.ministro}
      </p>
      <p>
        <b>Tom:</b> {musica.tom}
      </p>

      <div className="card bg-base-100 shadow-md mt-4">
        <div className="card-body whitespace-pre-line">
          <h2 className="font-bold text-xl">Letra</h2>
          <p>{musica.letra}</p>
        </div>
      </div>
    </div>
  );
}
