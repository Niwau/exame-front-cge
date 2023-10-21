import { z } from 'zod';

export const emailSchema = z.string().email('Insira um email válido');

export const passwordSchema = z
  .string()
  .min(8, 'A senha deve ter no mínimo 8 caracteres')
  .max(100, 'A senha deve ter no máximo 100 caracteres');

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Campo obrigatório')
});

export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    rePassword: z.string().min(1, 'Campo obrigatório')
  })
  .refine((data) => data.password === data.rePassword, {
    message: 'As senhas não coincidem',
    path: ['rePassword']
  });

export type RegisterType = z.infer<typeof registerSchema>;

export type LoginType = z.infer<typeof loginSchema>;
