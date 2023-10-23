import { AddButton } from '../Button';
import { Modal } from '../Modals/Modal';
import { APIResponse, api } from '@/services/api';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import { CreateCategory, createCategorySchema } from '@/schemas/categorySchemas';
import { Form, FormField } from '../Form';
import { useToggle } from '@/hooks/useToggle';
import { ERRORS } from '@/constants/errors';
import { DefaultValues, UseFormReturn } from 'react-hook-form';
import { isAxiosError } from 'axios';

export const AddCategoryModal = () => {
  const { open, isOpen, close } = useToggle();
  const { mutate } = useSWRConfig();

  const handleAddCategoryError = (e: unknown, { setError }: UseFormReturn<CreateCategory>) => {
    if (isAxiosError<APIResponse<string>>(e)) {
      if (e.response?.data.message == 'Category already exists.') {
        setError('name', { message: 'Essa categoria já existe' });
      }
    } else {
      toast.error(ERRORS.FAIL);
    }
  };

  const onSubmit = async (form: CreateCategory, methods: UseFormReturn<CreateCategory>) => {
    try {
      await api.post('/categories', form);
      close();
      mutate('/categories');
    } catch (e) {
      handleAddCategoryError(e, methods);
    }
  };

  return (
    <>
      <AddButton onClick={open}>Nova Categoria</AddButton>

      <Modal title="Nova Categoria" isOpen={isOpen} onClose={close}>
        <Form schema={createCategorySchema} fields={categoryFields} onSubmit={onSubmit} defaultValues={defaultValues}>
          <AddButton>Adicionar Categoria</AddButton>
        </Form>
      </Modal>
    </>
  );
};

export const categoryFields: FormField<CreateCategory>[] = [
  {
    label: 'Nome',
    name: 'name',
    placeholder: 'Ex: Camisetas'
  },
  {
    label: 'Cor de destaque',
    name: 'color',
    type: 'color',
    className: 'w-full'
  }
];

const defaultValues: DefaultValues<CreateCategory> = { color: '#FFFFFF', name: '' };
