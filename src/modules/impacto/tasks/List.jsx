
import PageHeader from "../../../../components/ui/PageHeader";
import Card from "../../../../components/ui/Card";
import { Link } from "react-router-dom";

export default function ImpactoTasksList() {
  return (
    <div className='flex flex-col w-full'>
      <div className='w-full max-w-4xl mx-auto px-3 md:px-0 flex flex-col gap-6'>
        <PageHeader 
          title="Lista de Tasks - Impacto" 
          subtitle="Gerencie itens"
        />

        <Card>
          <div className="flex justify-end mb-4">
            <Link to="/ministerios/impacto/tasks/create" className="btn btn-primary">+ Novo</Link>
          </div>

          <div className="p-4 bg-base-200 rounded-xl">
            <p>(Mock) Aqui exibirá a tabela de tasks do ministério Impacto</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
