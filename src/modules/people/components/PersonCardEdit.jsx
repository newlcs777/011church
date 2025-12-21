import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { FaTrash } from "react-icons/fa";

export default function PersonCardEdit({
  form,
  enderecoForm,
  onChange,
  onEnderecoChange,
  onSave,
  onDelete,
}) {
  return (
    <div
      className="
        !bg-transparent
        !border-none
        !shadow-none
        !rounded-none
        !p-0
        max-w-md
        mx-auto
        flex
        flex-col
        gap-8
        pb-6
      "
    >
      {/* INFORMAÇÕES DA PESSOA */}
      <div className="flex flex-col gap-5">
        <h3 className="text-base font-semibold">
          Informações da pessoa
        </h3>

        <Input
          name="nome"
          label="Nome"
          value={form.nome}
          onChange={onChange}
        />

        <Input
          name="telefone"
          label="WhatsApp"
          value={form.telefone}
          onChange={onChange}
        />

        <textarea
          name="observacao"
          value={form.observacao}
          onChange={onChange}
          rows={3}
          placeholder="Observação"
          className="
            w-full
            rounded-lg
            border
            border-base-300
            bg-base-100
            px-3
            py-2
            text-sm
            resize-none
          "
        />
      </div>

      {/* LOCALIZAÇÃO */}
      <div className="flex flex-col gap-5">
        <h3 className="text-base font-semibold">
          Localização
        </h3>

        <Input
          name="texto"
          label="Endereço completo"
          value={enderecoForm.texto}
          onChange={onEnderecoChange}
        />

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-5
          "
        >
          <Input
            name="numero"
            label="Número"
            value={enderecoForm.numero}
            onChange={onEnderecoChange}
          />

          <Input
            name="cep"
            label="CEP"
            value={enderecoForm.cep}
            onChange={onEnderecoChange}
          />

          <Input
            name="cidade"
            label="Cidade"
            value={enderecoForm.cidade}
            onChange={onEnderecoChange}
          />

          <Input
            name="estado"
            label="UF"
            value={enderecoForm.estado}
            onChange={onEnderecoChange}
          />
        </div>
      </div>

      {/* SALVAR (CENTRALIZADO, IGUAL DNA) */}
      <div className="flex justify-center pt-2">
        <Button
          variant="ghost"
          onClick={onSave}
          className="px-6"
        >
          Salvar alterações
        </Button>
      </div>

      {/* EXCLUIR (NO LUGAR DO CANCELAR) */}
      <div className="flex justify-end pt-2">
        <Button
          variant="ghost"
          onClick={onDelete}
          className="
            flex
            items-center
            gap-2
            text-sm
            text-error
            hover:text-error
          "
        >
          <FaTrash size={14} />
          Excluir pessoa
        </Button>
      </div>
    </div>
  );
}
