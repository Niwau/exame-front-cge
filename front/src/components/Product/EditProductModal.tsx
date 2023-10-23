import { Modal } from '../Modals/Modal';
import { UseFormReturn } from 'react-hook-form';
import { CreateProduct, createProductSchema } from '@/schemas/productSchema';
import { APIResponse, api, useCategories } from '@/services/api';
import { useSWRConfig } from 'swr';
import { isAxiosError } from 'axios';
import { ProductInterface } from '@/types/ProductInterface';
import { Form } from '../Form';
import { getProductFormFields } from './AddProductModal';
import { toast } from 'react-toastify';
import { useToggle } from '@/hooks/useToggle';
import { EditActions } from '../EditActions';
import { EditButton } from '../Button';
import { useErrorChecker } from '@/hooks/useErrorChecker';
import { ERRORS } from '@/constants/errors';

export const EditProductModal = (product: ProductInterface) => {
  const { open, close, isOpen } = useToggle();
  const { mutate } = useSWRConfig();
  const { data, error } = useCategories();
  useErrorChecker(error, 'Ocorreu um erro ao buscar as categorias');

  const handleRequest = async (fn: () => Promise<void>) => {
    await fn();
    close();
    mutate('/products');
  };

  const updateProduct = async (newProduct: CreateProduct) => {
    await handleRequest(() => api.put(`/products/${product._id}`, newProduct));
  };

  const deleteProduct = async () => {
    try {
      await handleRequest(() => api.delete(`/products/${product._id}`));
    } catch (error) {
      toast.error(ERRORS.FAIL);
    }
  };

  const handleProductUpdateError = (e: unknown, { setError }: UseFormReturn<CreateProduct>) => {
    if (isAxiosError<APIResponse<string>>(e)) {
      if (e.response?.data.message === 'Product already exists.') {
        setError('name', { message: 'Esse produto já está cadastrado' });
      }
    } else {
      toast.error(ERRORS.FAIL);
    }
  };

  const onSubmit = async (form: CreateProduct, methods: UseFormReturn<CreateProduct>) => {
    try {
      await updateProduct(form);
    } catch (e) {
      handleProductUpdateError(e, methods);
    }
  };

  const fields = getProductFormFields(data?.data);

  return (
    <>
      <EditButton onClick={open} />

      <Modal title="Editar Produto" isOpen={isOpen} onClose={close}>
        <Form
          onSubmit={onSubmit}
          fields={fields}
          schema={createProductSchema}
          defaultValues={{
            category: product.category?._id,
            name: product.name,
            price: product.price,
            quantity: product.quantity
          }}
        >
          <EditActions onDelete={deleteProduct} />
        </Form>
      </Modal>
    </>
  );
};
