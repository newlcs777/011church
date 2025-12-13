
import { Link } from "react-router-dom";

export default function MusicaCard({ musica }) {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">{musica.titulo}</h2>
        <p>
          <b>Ministro:</b> {musica.ministro}
        </p>
        <p>
          <b>Tom:</b> {musica.tom}
        </p>

        <Link to={`/louvor/${musica.id}`} className="btn btn-primary mt-3">
          Ver Letra
        </Link>
      </div>
    </div>
  );
}
