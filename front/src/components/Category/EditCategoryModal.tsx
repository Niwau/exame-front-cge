import { Modal } from '../Modals/Modal';
import { api } from '@/services/api';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import { CreateCategory, createCategorySchema } from '@/schemas/categorySchemas';
import { CategoryInterface } from '@/types/CategoryInterface';
import { Form } from '../Form';
import { categoryFields } from './AddCategoryModal';
import { EditActions } from '../EditActions';
import { useToggle } from '@/hooks/useToggle';
import { ERRORS } from '@/constants/errors';
import { EditButton } from '../Button';

export const EditCategoryModal = (category: CategoryInterface) => {
  const { open, isOpen, close } = useToggle();
  const { mutate } = useSWRConfig();

  const handleRequest = async (request: () => Promise<void>) => {
    try {
      await request();
      close();
      mutate('/categories');
    } catch (error) {
      toast.error(ERRORS.FAIL);
    }
  };

  const updateCategory = async (newCategory: CreateCategory) => {
    await handleRequest(() => api.put(`/categories/${category._id}`, newCategory));
  };

  const deleteCategory = async () => {
    await handleRequest(() => api.delete(`/categories/${category._id}`));
  };

  const onSubmit = async (form: CreateCategory) => {
    await updateCategory(form);
  };

  return (
    <>
      <EditButton onClick={open} />

      <Modal title="Editar Categoria" isOpen={isOpen} onClose={close}>
        <Form schema={createCategorySchema} onSubmit={onSubmit} fields={categoryFields} defaultValues={category}>
          <EditActions onDelete={deleteCategory} />
        </Form>
      </Modal>
    </>
  );
};
