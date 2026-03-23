import { z } from 'zod';

export const TaskTypeSchema = z.object({
    name: z.string({ error: 'El nombre es requerido' }).min(1, 'El nombre no puede estar vacío').max(100, 'El nombre es muy largo'),
    color: z.string({ error: 'El color es requerido' }).min(1, 'El color no puede estar vacío').max(7, 'El color es muy largo'),
}).strict();