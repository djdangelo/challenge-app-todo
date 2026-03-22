import { z } from 'zod';

export const CreateTaskSchema = z.object({
    title: z.string({ error: 'El título es requerido' }).min(1, 'El título no puede estar vacío').max(100, 'El título es muy largo'),
    description: z.string({ error: 'La descripción es requerida' }).min(1, 'La descripción no puede estar vacía'),
    taskTypeId: z.string().uuid('El ID del tipo de tarea debe ser un UUID válido').min(1, 'El ID del tipo de tarea es requerido'),
    isCompleted: z.boolean().default(false),
    userId: z.string().uuid('El ID del usuario debe ser un UUID válido').min(1, 'El ID del usuario es requerido'),
}).strict();

export const UpdateTaskSchema = z.object({
    id: z.string().uuid('El ID de la tarea debe ser un UUID válido').min(1, 'El ID de la tarea es requerido'),
    title: z.string({ error: 'El título es requerido' }).min(1, 'El título no puede estar vacío').max(100, 'El título es muy largo'),
    description: z.string({ error: 'La descripción es requerida' }).min(1, 'La descripción no puede estar vacía'),
    taskTypeId: z.string().uuid('El ID del tipo de tarea debe ser un UUID válido').min(1, 'El ID del tipo de tarea es requerido'),
    isCompleted: z.boolean().default(false),
    userId: z.string().uuid('El ID del usuario debe ser un UUID válido').min(1, 'El ID del usuario es requerido'),
}).strict();