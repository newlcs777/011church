
import PageHeader from "../../../../components/ui/PageHeader";
import Card from "../../../../components/ui/Card";

export default function ImpactoTasksCreate() {
  return (
    <div className='flex flex-col w-full'>
      <div className='w-full max-w-4xl mx-auto px-3 md:px-0 flex flex-col gap-6'>
        <PageHeader 
          title="Criar Tasks - Impacto"
          subtitle="Adicionar novo item"
        />

        <Card>
          <div className="p-4">
            <p>(Mock) Formulário de criação</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
