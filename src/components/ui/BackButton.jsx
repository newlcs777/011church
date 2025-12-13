import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function BackButton({ label = "Voltar" }) {
  const navigate = useNavigate();
  return (
    <Button variant="outline" size="sm" full onClick={() => navigate(-1)}>
      ← {label}
    </Button>
  );
}
