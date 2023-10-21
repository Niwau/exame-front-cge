'use client';
import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { Field } from '@/components/Field';
import { Input } from '@/components/Input';
import { LoginType, loginSchema } from '@/schemas/userSchema';
import { APIResponse, api } from '@/services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useAuthContext } from '@/contexts/AuthContex';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<LoginType>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(loginSchema)
  });

  const { setIsAuthenticated } = useAuthContext();

  const handleLogin = async (email: string, password: string) => {
    const res = await api.post<APIResponse<string>>('/login', { email, password });
    localStorage.setItem('token', res.data.message);
    toast.success('Login realizado com sucesso!');
    setIsAuthenticated(true);
  };

  const handleErrorResponse = (message?: string) => {
    if (message == 'Invalid email or password.') {
      setError('email', {
        message: 'Email ou senha inválidos.'
      });
    }
  };

  const onSubmit = handleSubmit(async (form) => {
    try {
      await handleLogin(form.email, form.password);
    } catch (e) {
      if (axios.isAxiosError<APIResponse<string>>(e)) {
        handleErrorResponse(e.response?.data.message);
      } else {
        toast.error('Um erro ocorreu ao realizar o login, tente novamente mais tarde.');
      }
    }
  });

  return (
    <Box className="p-8 w-[400px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <form autoComplete="off" className="flex flex-col gap-4" onSubmit={onSubmit}>
        <h1 className="text-base font-semibold text-white">Login</h1>
        <Field>
          <Field.Label>Email</Field.Label>
          <Input {...register('email')} errorMessage={errors.email?.message} />
        </Field>
        <Field>
          <Field.Label>Senha</Field.Label>
          <Input type="password" {...register('password')} errorMessage={errors.password?.message} />
        </Field>
        <Button>Login</Button>
        <p className="text-white">
          Não possui conta?{' '}
          <Link className="text-primary underline" href="/signup">
            Cadastre-se
          </Link>
        </p>
      </form>
    </Box>
  );
}