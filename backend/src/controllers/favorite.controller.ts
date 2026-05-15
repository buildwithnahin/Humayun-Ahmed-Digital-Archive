import { Request, Response, NextFunction } from 'express';
import { FavoriteService } from '../services/favorite.service';

export class FavoriteController {
  private favoriteService = new FavoriteService();

  addFavorite = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { workId } = req.body;
      const userId = req.user!.userId;
      
      await this.favoriteService.addFavorite(userId, workId);
      res.status(201).json({ success: true, message: 'Added to favorites' });
    } catch (error) {
      next(error);
    }
  };

  removeFavorite = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { workId } = req.params;
      const userId = req.user!.userId;
      
      await this.favoriteService.removeFavorite(userId, workId);
      res.status(200).json({ success: true, message: 'Removed from favorites' });
    } catch (error) {
      next(error);
    }
  };

  getUserFavorites = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      const favorites = await this.favoriteService.getUserFavorites(userId);
      
      res.status(200).json({ success: true, data: { favorites } });
    } catch (error) {
      next(error);
    }
  };
}
