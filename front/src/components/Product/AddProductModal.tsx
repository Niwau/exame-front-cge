import { useEffect, useState } from 'react';
import { Button } from '../Button';
import { Plus } from '@phosphor-icons/react';
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
import { isAxiosError } from 'axios'

export const AddProductModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, error } = useCategories(); // Busca as categorias no cache
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (error) {
      toast.error('Ocorreu um erro ao buscar as categorias');
    }
  }, [error])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError
  } = useForm<CreateProduct>({
    defaultValues: {
      category: '',
      name: '',
      price: 0,
      quantity: 1
    },
    resolver: zodResolver(createProductSchema)
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
      await api.post('/products', form);
      toast.success('Produto adicionado com sucesso!');
      close();
      mutate('/products');
    } catch (e) {
      if (isAxiosError<APIResponse<string>>(e)) {
        if (e.response?.data.message === 'Product already exists.') {
          setError('name', { message: 'Esse produto já está cadastrado' })
        }
      } else {
        toast.error('Ocorreu um erro ao adicionar o produto');
      }
    }
  });

  return (
    <>
      <Button onClick={open} leftIcon={<Plus weight="bold" />}>
        Novo Produto
      </Button>

      <Modal title="Novo Produto" isOpen={isOpen} onClose={close}>
        <form className="mt-4 flex flex-col gap-6" onSubmit={onSubmit}>
          <Field>
            <Field.Label>Nome</Field.Label>
            <Input errorMessage={errors.name?.message} {...register('name')} placeholder="Ex: All Star" />
          </Field>
          <Field>
            <Field.Label>Preço</Field.Label>
            <Input
              type="number"
              step={0.01}
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
          <Button leftIcon={<Plus />}>Adicionar Produto</Button>
        </form>
      </Modal>
    </>
  );
};
