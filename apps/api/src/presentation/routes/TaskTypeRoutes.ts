import { Router } from 'express';
import { TaskTypeController } from '../controllers/TaskTypeController';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { validateSchema } from '../middlewares/SchemaValidator';
import { TaskTypeSchema } from '@presentation/schemas/TaskTypeSchema';

const router = Router();
const taskTypeController = new TaskTypeController();

router.use(authMiddleware);

router.get('/', (req, res) => taskTypeController.getAll(req, res));
router.post('/', validateSchema(TaskTypeSchema), (req, res) => taskTypeController.create(req, res));
router.put('/:id', validateSchema(TaskTypeSchema), (req, res) => taskTypeController.update(req, res));
router.delete('/:id', (req, res) => taskTypeController.delete(req, res));

export const taskTypeRoutes = router;