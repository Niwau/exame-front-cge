import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { LoginType, RegisterType, registerSchema } from '@/schemas/userSchema';
import { APIResponse, api } from '@/services/api';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';
import { Form, FormField } from '@/components/Form';
import { DefaultValues, UseFormReturn } from 'react-hook-form';
import { ERRORS } from '@/constants/errors';

export default function SignUp() {
  const handleSignUp = async (credentials: LoginType) => {
    await api.post('/users', credentials);
    toast.success('Conta criada com sucesso!');
  };

  const handleErrorResponse = (e: unknown, { setError }: UseFormReturn<RegisterType>) => {
    if (isAxiosError<APIResponse<string>>(e)) {
      if (e.response?.data.message == 'User already exists.') {
        setError('email', { message: 'Esse email já está em uso.' });
      }
    } else {
      toast.error(ERRORS.FAIL);
    }
  };

  const onSubmit = async (credentials: RegisterType, methods: UseFormReturn<RegisterType>) => {
    try {
      await handleSignUp(credentials);
    } catch (e) {
      handleErrorResponse(e, methods);
    }
  };

  return (
    <Box className="p-8 w-[400px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <Form title="Cadastro" schema={registerSchema} fields={fields} defaultValues={defaultValues} onSubmit={onSubmit}>
        <div className="flex flex-col gap-2">
          <Button>Criar conta</Button>
          <p className="text-white">
            Já possui uma conta?{' '}
            <Link className="text-primary underline" href="/">
              Entrar
            </Link>
          </p>
        </div>
      </Form>
    </Box>
  );
}

const defaultValues: DefaultValues<RegisterType> = {
  email: '',
  password: '',
  rePassword: ''
};

const fields: FormField<RegisterType>[] = [
  {
    name: 'email',
    label: 'Email'
  },
  {
    name: 'password',
    label: 'Senha',
    type: 'password'
  },
  {
    name: 'rePassword',
    label: 'Confirmar senha',
    type: 'password'
  }
];
