import { useEffect, useState } from 'react';
import { Button, DeleteButton, SaveButton } from '../Button';
import { Pen, Plus, Trash } from '@phosphor-icons/react';
import { Field } from '../Field';
import { Input } from '../Input';
import { Modal } from '../Modal';
import { Select } from '../Select';
import { useForm } from 'react-hook-form';
import { CreateProduct, createProductSchema } from '@/schemas/productSchema';
import { APIResponse, api, useCategories } from '@/services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import { isAxiosError } from 'axios';
import { ProductInterface } from '@/types/ProductInterface';
import { Confirm } from '../Confirm';

export const EditProductModal = (product: ProductInterface) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = useSWRConfig();
  const { data, error } = useCategories();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError
  } = useForm<CreateProduct>({
    resolver: zodResolver(createProductSchema)
  });

  useEffect(() => {
    if (error) {
      toast.error('Ocorreu um erro ao buscar as categorias');
    }
  }, [error]);

  useEffect(() => {
    reset({
      category: product?.category?._id ?? '',
      name: product.name,
      price: product.price,
      quantity: product.quantity
    });
  }, [product, reset]);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    reset();
  };

  const updateProduct = async (id: string, product: CreateProduct) => {
    await api.put(`/products/${id}`, product);
    toast.success('Produto atualizado com sucesso!');
    close();
    mutate('/products');
  };

  const deleteProduct = async () => {
    await api.delete(`/products/${product._id}`);
    toast.success('Produto excluído com sucesso!');
    close();
    mutate('/products');
  }

  const onSubmit = handleSubmit(async (form) => {
    try {
      await updateProduct(product._id, form);
    } catch (e) {
      if (isAxiosError<APIResponse<string>>(e)) {
        if (e.response?.data.message === 'Product already exists.') {
          setError('name', { message: 'Esse produto já está cadastrado' });
        }
      } else {
        toast.error('Ocorreu um erro ao atualizar esse produto');
      }
    }
  });

  return (
    <>
      <button className="flex mx-auto" onClick={open}>
        <Pen weight="duotone" size={24} />
      </button>

      <Modal title="Editar Produto" isOpen={isOpen} onClose={close}>
        <form className="mt-4 flex flex-col gap-6">
          <Field>
            <Field.Label>Nome</Field.Label>
            <Input errorMessage={errors.name?.message} {...register('name')} placeholder="Ex: All Star" />
          </Field>
          <Field>
            <Field.Label>Preço</Field.Label>
            <Input
              type="number"
              errorMessage={errors.price?.message}
              {...register('price', { setValueAs: (v) => parseFloat(v) })}
              placeholder="Ex: 12.00"
            />
          </Field>
          <Field>
            <Field.Label>Quantidade</Field.Label>
            <Input
              type="number"
              errorMessage={errors.quantity?.message}
              {...register('quantity', { setValueAs: (v) => parseInt(v) })}
              placeholder="Ex: 2"
            />
          </Field>
          <Field>
            <Field.Label>Categoria</Field.Label>
            <Select errorMessage={errors.category?.message} {...register('category')}>
              {data?.data.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </Field>
          <div className="flex w-full gap-4">
            <Confirm
              onConfirm={deleteProduct}
              render={({ open }) => (
                <DeleteButton type="button" onClick={open}>
                  Excluir
                </DeleteButton>
              )}
            />
            <Confirm
              onConfirm={onSubmit}
              render={({ open }) => (
                <SaveButton type="button" onClick={open} className="flex-1">
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
