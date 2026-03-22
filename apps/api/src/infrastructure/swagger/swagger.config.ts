// apps/api/src/infrastructure/swagger/swagger.config.ts

export const swaggerSpec = {
    openapi: '3.0.0',
    info: {
        title: 'Challenge Técnico API - FullStack',
        version: '1.0.0',
        description: 'Documentación del API para la gestión de tareas. Construida con Node.js, Express, TypeScript y DDD.',
    },
    servers: [
        {
            url: '/api',
            description: 'Servidor Actual'
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            Task: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    title: { type: 'string' },
                    description: { type: 'string' },
                    isCompleted: { type: 'boolean' },
                    createdAt: { type: 'string', format: 'date-time' },
                    userId: { type: 'string' },
                    taskTypeId: { type: 'string', nullable: true }
                }
            },
            TaskType: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    color: { type: 'string', nullable: true }
                }
            }
        }
    },
    paths: {
        // ================= USERS =================
        '/users/login': {
            post: {
                summary: 'Inicia sesión o verifica un usuario',
                tags: ['Users'],
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { type: 'object', properties: { email: { type: 'string', example: 'dangelo@ejemplo.com' } } } } }
                },
                responses: {
                    200: { description: 'Login exitoso (devuelve token y usuario)' },
                    404: { description: 'Usuario no encontrado' }
                }
            }
        },
        '/users/register': {
            post: {
                summary: 'Registra un nuevo usuario',
                tags: ['Users'],
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { type: 'object', properties: { email: { type: 'string', example: 'dangelo@ejemplo.com' } } } } }
                },
                responses: {
                    201: { description: 'Usuario creado exitosamente (devuelve token y usuario)' },
                    400: { description: 'El usuario ya existe o datos inválidos' }
                }
            }
        },

        // ================= TASKS =================
        '/tasks': {
            get: {
                summary: 'Obtiene todas las tareas del usuario autenticado ordenadas por fecha',
                tags: ['Tasks'],
                security: [{ bearerAuth: [] }],
                responses: {
                    200: { description: 'Lista de tareas obtenida', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Task' } } } } }
                }
            },
            post: {
                summary: 'Crea una nueva tarea',
                tags: ['Tasks'],
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    title: { type: 'string', example: 'Configurar Angular 17' },
                                    description: { type: 'string', example: 'Crear monorepo y arquitectura limpia' },
                                    taskTypeId: { type: 'string', example: 'uuid-del-tipo', nullable: true }
                                }
                            }
                        }
                    }
                },
                responses: {
                    201: { description: 'Tarea creada exitosamente' }
                }
            }
        },
        '/tasks/{id}': {
            put: {
                summary: 'Actualiza una tarea existente (o la marca como completada)',
                tags: ['Tasks'],
                security: [{ bearerAuth: [] }],
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    title: { type: 'string', example: 'Configurar Angular 17 (Terminado)' },
                                    description: { type: 'string', example: 'Monorepo listo' },
                                    isCompleted: { type: 'boolean', example: true },
                                    taskTypeId: { type: 'string', nullable: true }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: { description: 'Tarea actualizada' }
                }
            },
            delete: {
                summary: 'Elimina una tarea',
                tags: ['Tasks'],
                security: [{ bearerAuth: [] }],
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                responses: {
                    200: { description: 'Tarea eliminada exitosamente' }
                }
            }
        },

        // ================= TASK TYPES =================
        '/task-types': {
            get: {
                summary: 'Obtiene todos los tipos de tareas (Categorías)',
                tags: ['Task Types'],
                security: [{ bearerAuth: [] }],
                responses: {
                    200: { description: 'Lista de tipos obtenida', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/TaskType' } } } } }
                }
            },
            post: {
                summary: 'Crea un nuevo tipo de tarea',
                tags: ['Task Types'],
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { type: 'object', properties: { name: { type: 'string', example: 'Urgente' }, color: { type: 'string', example: '#FF0000' } } } } }
                },
                responses: {
                    201: { description: 'Tipo creado exitosamente' }
                }
            }
        },
        '/task-types/{id}': {
            put: {
                summary: 'Actualiza un tipo de tarea',
                tags: ['Task Types'],
                security: [{ bearerAuth: [] }],
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { type: 'object', properties: { name: { type: 'string', example: 'Trabajo' }, color: { type: 'string', example: '#0000FF' } } } } }
                },
                responses: { 200: { description: 'Tipo actualizado' } }
            },
            delete: {
                summary: 'Elimina un tipo de tarea',
                tags: ['Task Types'],
                security: [{ bearerAuth: [] }],
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                responses: { 200: { description: 'Tipo eliminado exitosamente' } }
            }
        }
    }
};