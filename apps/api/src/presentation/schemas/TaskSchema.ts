import { z } from 'zod';

export const CreateTaskSchema = z.object({
    title: z.string({ error: 'El título es requerido' }).min(1, 'El título no puede estar vacío').max(100, 'El título es muy largo'),
    description: z.string({ error: 'La descripción es requerida' }).min(1, 'La descripción no puede estar vacía'),
    taskTypeId: z.string().uuid('El ID del tipo de tarea debe ser un UUID válido').min(1, 'El ID del tipo de tarea es requerido'),
}).strict();

export const UpdateTaskSchema = z.object({
    title: z.string().max(100, 'El título es muy largo').optional(),
    description: z.string().optional(),
    taskTypeId: z.string().uuid('El ID del tipo de tarea debe ser un UUID válido').optional(),
    isCompleted: z.boolean({ error: 'El estado de la tarea debe ser un booleano' }).optional(),
}).strict();