import { Modal } from './Modal';
import { Button } from '../Button';
import { useToggle } from '@/hooks/useToggle';

interface RenderParams {
  open: () => void;
}

interface ConfirmProps {
  onConfirm?: () => void;
  render: (params: RenderParams) => JSX.Element;
}

export const Confirm = ({ onConfirm, render }: ConfirmProps) => {
  const { open, isOpen, close } = useToggle()

  const handleConfirm = () => {
    onConfirm?.();
    close();
  };

  return (
    <>
      {render({ open })}
      <Modal title="Tem certeza que deseja realizar esta ação?" isOpen={isOpen} onClose={close}>
        <div className="flex justify-end gap-2">
          <Button className="btn-transparent" onClick={close}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </div>
      </Modal>
    </>
  );
};
