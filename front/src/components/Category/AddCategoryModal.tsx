import { useState } from 'react';
import { Button } from '../Button';
import { Plus } from '@phosphor-icons/react';
import { Field } from '../Field';
import { Input } from '../Input';
import { Modal } from '../Modal';
import { useForm } from 'react-hook-form';
import { api } from '@/services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import { CreateCategory, createCategorySchema } from '@/schemas/categorySchemas';

export const AddCategoryModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = useSWRConfig();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreateCategory>({
    defaultValues: {
      color: '#FFFFFF',
      name: ''
    },
    resolver: zodResolver(createCategorySchema)
  });

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    reset();
  };

  const onSubmit = handleSubmit(async (form) => {
    try {
      await api.post('/categories', form);
      toast.success('Categoria adicionada com sucesso!');
      close();
      mutate('/categories');
    } catch (error) {
      toast.error('Ocorreu um erro ao adicionar a categoria');
    }
  });

  return (
    <>
      <Button onClick={open} leftIcon={<Plus weight="bold" />}>
        Nova Categoria
      </Button>

      <Modal title="Nova Categoria" isOpen={isOpen} onClose={close}>
        <form className="mt-4 flex flex-col gap-6" onSubmit={onSubmit}>
          <Field>
            <Field.Label>Nome</Field.Label>
            <Input errorMessage={errors.name?.message} {...register('name')} placeholder="Ex: Alimentos" />
          </Field>
          <Field>
            <Field.Label>Cor de destaque</Field.Label>
            <Input className='w-full' type="color" errorMessage={errors.color?.message} {...register('color')} placeholder="Ex: #FFFFFF" />
          </Field>
          <Button leftIcon={<Plus />}>Adicionar Categoria</Button>
        </form>
      </Modal>
    </>
  );
};
