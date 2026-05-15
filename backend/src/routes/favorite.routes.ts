import { Router } from 'express';
import { FavoriteController } from '../controllers/favorite.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validator';
import { favoriteSchema } from '../validators/auth.validator';

const router = Router();
const favoriteController = new FavoriteController();

router.use(requireAuth); // Protect all favorite routes

router.post('/', validateRequest(favoriteSchema), favoriteController.addFavorite);
router.delete('/:workId', favoriteController.removeFavorite);
router.get('/', favoriteController.getUserFavorites);

export default router;
