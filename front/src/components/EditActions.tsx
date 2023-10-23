import { DeleteButton, SaveButton } from './Button';
import { Confirm } from './Modals/Confirm';

interface EditActionsProps {
  onSave?: () => void;
  onDelete?: () => void;
}

export const EditActions = ({ onSave, onDelete }: EditActionsProps) => {
  return (
    <div className="flex gap-4">
      <Confirm
        onConfirm={onDelete}
        render={({ open }) => (
          <DeleteButton type="button" onClick={open}>
            Excluir
          </DeleteButton>
        )}
      />
      <SaveButton onClick={onSave}>
        Salvar
      </SaveButton>
    </div>
  );
};
