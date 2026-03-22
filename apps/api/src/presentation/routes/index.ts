import { Router } from 'express';
import { userRoutes } from './UserRoutes';
import { taskRoutes } from './TaskRoutes';
import { taskTypeRoutes } from './TaskTypeRoutes';

const apiRouter = Router();

apiRouter.use('/users', userRoutes);
apiRouter.use('/tasks', taskRoutes);
apiRouter.use('/task-types', taskTypeRoutes);

export const router = apiRouter;