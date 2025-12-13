
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import { Link } from "react-router-dom";

export default function DiaconiaPage() {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-4xl mx-auto px-3 md:px-0 flex flex-col gap-6">
        <PageHeader 
          title="Ministério Diaconia" 
          subtitle="Gerencie membros e atividades."
        />

        <Card>
          <div className="flex flex-col gap-4">
            <Link to="/ministerios/diaconia/members" className="btn btn-primary">Gerenciar Membros</Link>
            <Link to="/ministerios/diaconia/tasks" className="btn btn-secondary">Gerenciar Atividades</Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
