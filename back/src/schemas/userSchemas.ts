import { z } from 'zod';

export const emailSchema = z.string().email();
export const passwordSchema = z.string().min(8).max(100);

export const createUserSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    rePassword: passwordSchema,
  })
  .refine((data) => data.password === data.rePassword, {
    message: 'The passwords do not match',
  });

export const loginUserSchema = z.object({
  email: emailSchema,
  password: z.string(), //Por motivos de segurança, a validação da senha não é necessária no login.
});

export type CreateUser = z.infer<typeof createUserSchema>;
