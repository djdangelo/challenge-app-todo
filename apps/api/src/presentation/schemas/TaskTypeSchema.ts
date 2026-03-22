import { z } from 'zod';

export const TaskTypeSchema = z.object({
    name: z.string({ error: 'El nombre es requerido' }).min(1, 'El nombre no puede estar vacío').max(100, 'El nombre es muy largo'),
    description: z.string({ error: 'La descripción es requerida' }).min(1, 'La descripción no puede estar vacía'),
}).strict();