import { useEffect } from 'react';
import { AddButton } from '../Button';
import { Modal } from '../Modals/Modal';
import { CreateProduct, createProductSchema } from '@/schemas/productSchema';
import { APIResponse, api, useCategories } from '@/services/api';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import { Form, FormField, Option } from '../Form';
import { DefaultValues, UseFormReturn } from 'react-hook-form';
import { isAxiosError } from 'axios';
import { useToggle } from '@/hooks/useToggle';
import { ERRORS } from '@/constants/errors';
import { useErrorChecker } from '@/hooks/useErrorChecker';
import { CategoryInterface } from '@/types/CategoryInterface';

export const AddProductModal = () => {
  const { open, isOpen, close } = useToggle();
  const { data, error } = useCategories();
  const { mutate } = useSWRConfig();
  useErrorChecker(error, 'Ocorreu um erro ao buscar as categorias');

  const addProduct = async (product: CreateProduct) => {
    await api.post('/products', product);
    mutate('/products');
    close();
  };

  const handleAddProductError = (e: unknown, { setError }: UseFormReturn<CreateProduct>) => {
    if (isAxiosError<APIResponse<string>>(e)) {
      if (e.response?.data.message == 'Product already exists.') {
        setError('name', { message: 'Esse produto já existe' });
      }
    } else {
      toast.error(ERRORS.FAIL);
    }
  };

  const onSubmit = async (product: CreateProduct, methods: UseFormReturn<CreateProduct>) => {
    try {
      await addProduct(product);
    } catch (error) {
      handleAddProductError(error, methods);
    }
  };

  const fields = getProductFormFields(data?.data);

  return (
    <>
      <AddButton onClick={open}>Novo Produto</AddButton>
      <Modal title="Novo Produto" isOpen={isOpen} onClose={close}>
        <Form defaultValues={defaultValues} onSubmit={onSubmit} schema={createProductSchema} fields={fields}>
          <AddButton>Adicionar Produto</AddButton>
        </Form>
      </Modal>
    </>
  );
};

export const getProductFormFields = (categories?: CategoryInterface[]): FormField<CreateProduct>[] => {
  const categoryOptions: Option[] =
    categories?.map((category) => ({ label: category.name, value: category._id })) ?? [];

  return [
    {
      label: 'Nome',
      name: 'name',
      placeholder: 'Ex: Arroz'
    },
    {
      label: 'Preço',
      name: 'price',
      type: 'number',
      registerOptions: { setValueAs: (price) => parseFloat(price) },
      step: 0.01,
      placeholder: 'Ex: 12,00'
    },
    {
      label: 'Quantidade',
      name: 'quantity',
      type: 'number',
      placeholder: 'Ex: 1',
      registerOptions: { setValueAs: (quantity) => parseInt(quantity) }
    },
    {
      label: 'Categoria',
      name: 'category',
      options: categoryOptions
    }
  ];
};

const defaultValues: DefaultValues<CreateProduct> = {
  category: '',
  name: '',
  price: 0,
  quantity: 1
};
