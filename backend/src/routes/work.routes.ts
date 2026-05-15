import { Router } from 'express';
import { WorkController } from '../controllers/work.controller';
import { validate } from '../middlewares/validate';
import { getWorksSchema } from '../validations/work.schema';

const router = Router();
const workController = new WorkController();

// GET /api/v1/works
router.get('/', validate(getWorksSchema), workController.getWorks);

export default router;
