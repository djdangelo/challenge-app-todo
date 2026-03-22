import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest';
import { validateSchema } from '../middlewares/SchemaValidator';
import { CreateTaskSchema, UpdateTaskSchema } from '@presentation/schemas/TaskSchema';

const router = Router();
const taskController = new TaskController();

router.use(authMiddleware);

router.post('/', validateSchema(CreateTaskSchema), (req, res) => taskController.create(req as AuthenticatedRequest, res));
router.get('/', (req, res) => taskController.getAllByUser(req as AuthenticatedRequest, res));
router.put('/:id', validateSchema(UpdateTaskSchema), (req, res) => taskController.update(req as AuthenticatedRequest, res));
router.delete('/:id', (req, res) => taskController.delete(req as AuthenticatedRequest, res));

export const taskRoutes = router;