'use client';
import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { Field } from '@/components/Field';
import { Input } from '@/components/Input';
import { RegisterType, registerSchema } from '@/schemas/userSchema';
import { APIResponse, api } from '@/services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function SignUp() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError
  } = useForm<RegisterType>({
    defaultValues: {
      email: '',
      password: '',
      rePassword: ''
    },
    resolver: zodResolver(registerSchema)
  });

  const handleSignUp = async (email: string, password: string, rePassword: string) => {
    await api.post('/users', { email, password, rePassword });
    toast.success('Conta criada com sucesso!');
  };

  const handleErrorResponse = (message?: string) => {
    if (message == 'User already exists.') {
      setError('email', { message: 'Esse email já está em uso.' });
    }
  };

  const onSubmit = handleSubmit(async (form) => {
    try {
      await handleSignUp(form.email, form.password, form.rePassword);
    } catch (e) {
      if (axios.isAxiosError<APIResponse<string>>(e)) {
        handleErrorResponse(e.response?.data.message);
      } else {
        toast.error('Ocorreu um erro ao criar a conta, tente novamente mais tarde.');
      }
    }
  });

  return (
    <Box className="p-8 w-[400px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <form autoComplete="off" className="flex flex-col gap-4" onSubmit={onSubmit}>
        <h1 className="text-base font-semibold text-white">Cadastre-se</h1>
        <Field>
          <Field.Label>Email</Field.Label>
          <Input errorMessage={errors.email?.message} {...register('email')} />
        </Field>
        <Field>
          <Field.Label>Senha</Field.Label>
          <Input errorMessage={errors.password?.message} type="password" {...register('password')} />
        </Field>
        <Field>
          <Field.Label>Confirmar senha</Field.Label>
          <Input errorMessage={errors.rePassword?.message} type="password" {...register('rePassword')} />
        </Field>
        <Button>Criar conta</Button>
        <p className="text-white">
          Já possui uma conta?{' '}
          <Link className="text-primary underline" href="/">
            Entrar
          </Link>
        </p>
      </form>
    </Box>
  );
}
