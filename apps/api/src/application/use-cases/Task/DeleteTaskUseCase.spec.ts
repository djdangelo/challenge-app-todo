import { DeleteTaskUseCase } from './DeleteTaskUseCase';

const mockTaskRepository = {
    findById: jest.fn(), // Usamos findById
    findAll: jest.fn(),
    findByUserId: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
} as any;

describe('DeleteTaskUseCase', () => {
    let useCase: DeleteTaskUseCase;

    beforeEach(() => {
        jest.clearAllMocks();
        useCase = new DeleteTaskUseCase(mockTaskRepository);
    });

    it('🟢 Debe eliminar la tarea si el usuario es el dueño (Ownership Correcto)', async () => {
        mockTaskRepository.findById.mockResolvedValue({
            id: 'task-1',
            title: 'Hacer testing',
            userId: 'user-123'
        });

        await useCase.execute('task-1', 'user-123');

        expect(mockTaskRepository.delete).toHaveBeenCalledWith('task-1');
    });

    it('🔴 Debe lanzar FORBIDDEN si un intruso intenta borrar la tarea ajena', async () => {
        mockTaskRepository.findById.mockResolvedValue({
            id: 'task-1',
            title: 'Secreto bancario',
            userId: 'user-123'
        });

        try {
            await useCase.execute('task-1', 'hacker-999');
            throw new Error('El código debió detener la ejecución antes de llegar aquí');
        } catch (error: any) {
            expect(error.message).toBe('FORBIDDEN');
        }

        expect(mockTaskRepository.delete).not.toHaveBeenCalled();
    });

    it('🟡 Debe lanzar NOT_FOUND si la tarea no existe', async () => {
        mockTaskRepository.findById.mockResolvedValue(null);

        try {
            await useCase.execute('task-fantasma', 'user-123');
            throw new Error('El código debió detener la ejecución antes de llegar aquí');
        } catch (error: any) {
            expect(error.message).toBe('NOT_FOUND');
        }
    });
});