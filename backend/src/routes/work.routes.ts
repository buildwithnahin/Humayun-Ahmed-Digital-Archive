import { Router } from 'express';
import { WorkController } from '../controllers/work.controller';
import { validateRequest } from '../middlewares/validator';
import { getWorksQuerySchema } from '../validators/work.validator';

const router = Router();
const workController = new WorkController();

// GET /api/v1/works - Get all works with search, filter, pagination
router.get('/', validateRequest(getWorksQuerySchema), workController.getWorks);

// GET /api/v1/works/:id - Get a specific work
router.get('/:id', workController.getWorkById);

export default router;
