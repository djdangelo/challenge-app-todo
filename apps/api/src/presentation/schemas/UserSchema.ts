import { z } from 'zod';

export const RegisterUserSchema = z.object({
    email: z.string({ error: 'El email es requerido' }).email('El email es inválido'),
}).strict();

export const LoginUserSchema = z.object({
    email: z.string({ error: 'El email es requerido' }).email('El email es inválido'),
}).strict();
