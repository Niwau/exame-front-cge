import { useEffect, useState } from 'react';
import { Button, DeleteButton, SaveButton } from '../Button';
import { Pen, Plus } from '@phosphor-icons/react';
import { Field } from '../Field';
import { Input } from '../Input';
import { Modal } from '../Modal';
import { useForm } from 'react-hook-form';
import { api } from '@/services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import { CreateCategory, createCategorySchema } from '@/schemas/categorySchemas';
import { Confirm } from '../Confirm';
import { CategoryInterface } from '@/types/CategoryInterface';
import { isAxiosError } from 'axios';

export const EditCategoryModal = (category: CategoryInterface) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = useSWRConfig();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreateCategory>({
    resolver: zodResolver(createCategorySchema)
  });

  useEffect(() => {
    reset({
      color: category.color,
      name: category.name
    });
  }, [reset, category]);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    reset();
  };

  const updateCategory = async (id: string, category: CreateCategory) => {
    await api.put(`/categories/${id}`, category);
    toast.success('Categoria adicionada com sucesso!');
    close();
    mutate('/categories');
  };

  const deleteCategory = async () => {
    await api.delete(`/categories/${category._id}`);
    toast.success('Categoria excluída com sucesso!');
    close();
    mutate('/categories');
  };

  const onSubmit = handleSubmit(async (form) => {
    try {
      await updateCategory(category._id, form);
    } catch (e) {
      if (isAxiosError(e)) {
        toast.error('Ocorreu um erro ao atualizar a categoria');
      } else {
        toast.error('Ocorreu um erro ao atualizar a categoria');
      }
    }
  });

  return (
    <>
      <button className="flex mx-auto" onClick={open}>
        <Pen weight="duotone" size={24} />
      </button>

      <Modal title="Nova Categoria" isOpen={isOpen} onClose={close}>
        <form className="mt-4 flex flex-col gap-6" onSubmit={onSubmit}>
          <Field>
            <Field.Label>Nome</Field.Label>
            <Input errorMessage={errors.name?.message} {...register('name')} placeholder="Ex: Alimentos" />
          </Field>
          <Field>
            <Field.Label>Cor de destaque</Field.Label>
            <Input
              className="w-full"
              type="color"
              errorMessage={errors.color?.message}
              {...register('color')}
            />
          </Field>
          <div className="flex w-full gap-4">
            <Confirm
              onConfirm={deleteCategory}
              render={({ open }) => (
                <DeleteButton type="button" onClick={open}>
                  Excluir
                </DeleteButton>
              )}
            />
            <Confirm
              onConfirm={onSubmit}
              render={({ open }) => (
                <SaveButton type="button" onClick={open}>
                  Salvar
                </SaveButton>
              )}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};
