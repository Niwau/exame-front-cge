import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

interface RenderParams {
  open: () => void;
}

interface ConfirmProps {
  onConfirm?: () => void;
  render: (params: RenderParams) => JSX.Element;
}

export const Confirm = ({ onConfirm, render }: ConfirmProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => {
    setIsOpen(false);
  };

  const open = () => {
    setIsOpen(true);
  };

  const handleConfirm = () => {
    onConfirm?.();
    close();
  }

  return (
    <>
      {render({ open })}
      <Modal title="Tem certeza que deseja realizar esta ação?" isOpen={isOpen} onClose={close}>
        <div className='flex justify-end gap-2'>
          <Button className='btn-transparent' onClick={close}>Cancelar</Button>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </div>
      </Modal>
    </>
  );
};
