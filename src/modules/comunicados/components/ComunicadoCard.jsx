
import { Link } from "react-router-dom";

export default function ComunicadoCard({ comunicado }) {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">{comunicado.titulo}</h2>
        <p className="opacity-70 text-sm">{comunicado.data}</p>
        <p>{comunicado.mensagem}</p>

        <Link
          to={`/comunicados/${comunicado.id}`}
          className="btn btn-primary mt-3"
        >
          Ver mais
        </Link>
      </div>
    </div>
  );
}
