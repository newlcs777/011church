
import PageHeader from "../../../../components/ui/PageHeader";
import Card from "../../../../components/ui/Card";
import { useParams } from "react-router-dom";

export default function ImpactoTasksEdit() {
  const { id } = useParams();
  return (
    <div className='flex flex-col w-full'>
      <div className='w-full max-w-4xl mx-auto px-3 md:px-0 flex flex-col gap-6'>
        <PageHeader 
          title="Editar Tasks - Impacto"
          subtitle="Editar item existente"
        />

        <Card>
          <div className="p-4">
            <p>(Mock) Formulário de edição do ID: {id}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
