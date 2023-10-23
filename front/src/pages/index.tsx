import { Box } from '@/components/Box';
import { LoginType, loginSchema } from '@/schemas/userSchema';
import { APIResponse, api } from '@/services/api';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useAuthContext } from '@/contexts/AuthContex';
import { Form, FormField } from '@/components/Form';
import { DefaultValues, UseFormReturn } from 'react-hook-form';
import { ERRORS } from '@/constants/errors';
import { Button } from '@/components/Button';
import { useRouter } from 'next/router';

export default function Login() {
  const { setIsAuthenticated } = useAuthContext();
  const router = useRouter()

  const handleLogin = async (credentials: LoginType) => {
    const res = await api.post<APIResponse<string>>('/login', credentials);
    localStorage.setItem('token', res.data.message);
    toast.success('Login realizado com sucesso!');
    router.replace('/products')
    setIsAuthenticated(true);
  };

  const handleErrorResponse = (e: unknown, { setError }: UseFormReturn<LoginType>) => {
    if (isAxiosError<APIResponse<string>>(e)) {
      if (e?.response?.data.message == 'Invalid email or password.') {
        setError('email', {
          message: 'Email ou senha inválidos.'
        });
      }
    } else {
      toast.error(ERRORS.FAIL);
    }
  };

  const onSubmit = async (credentials: LoginType, methods: UseFormReturn<LoginType>) => {
    try {
      await handleLogin(credentials);
    } catch (e) {
      handleErrorResponse(e, methods);
    }
  };

  return (
    <Box className="p-8 w-[400px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <Form title="Login" fields={loginFields} schema={loginSchema} onSubmit={onSubmit} defaultValues={defaultValues}>
        <div className="flex flex-col gap-2">
          <Button>Entrar</Button>
          <p className="text-white">
            Não possui conta?{' '}
            <Link className="text-primary" href="/signup">
              Cadastre-se
            </Link>
          </p>
        </div>
      </Form>
    </Box>
  );
}

const defaultValues: DefaultValues<LoginType> = {
  email: '',
  password: ''
};

export const loginFields: FormField<LoginType>[] = [
  {
    label: 'Email',
    name: 'email'
  },
  {
    label: 'Senha',
    name: 'password',
    type: 'password'
  }
];
