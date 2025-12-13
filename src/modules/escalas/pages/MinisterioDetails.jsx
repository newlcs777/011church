
import { Link, useParams } from "react-router-dom";
import { getMinisterio } from "../services/escalasService";

export default function MinisterioDetails() {
  const { id } = useParams();
  const ministerio = getMinisterio(id);

  if (!ministerio) return <p className="p-4">Ministério não encontrado.</p>;

  return (
    <div className="flex flex-col gap-4">
      <Link to="/escalas" className="btn btn-outline btn-sm w-24">
        ← Voltar
      </Link>

      <h1 className="text-2xl font-bold">{ministerio.nome}</h1>
      <p>
        <b>Líder:</b> {ministerio.lider}
      </p>

      <h2 className="text-xl font-semibold mt-4">Membros</h2>
      <ul className="list-disc ml-6">
        {ministerio.membros.map((m, index) => (
          <li key={index}>{m}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-4">Escala do Mês</h2>
      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          {ministerio.escala.map((dia, index) => (
            <div key={index} className="border-b py-2">
              <p>
                <b>Data:</b> {dia.data}
              </p>
              <p>
                <b>Responsável:</b> {dia.responsavel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
