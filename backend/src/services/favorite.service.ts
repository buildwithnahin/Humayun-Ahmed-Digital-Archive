import { FavoriteRepository } from '../repositories/favorite.repository';

export class FavoriteService {
  private favoriteRepo = new FavoriteRepository();

  async addFavorite(userId: string, workId: string) {
    return await this.favoriteRepo.addFavorite(userId, workId);
  }

  async removeFavorite(userId: string, workId: string) {
    await this.favoriteRepo.removeFavorite(userId, workId);
  }

  async getUserFavorites(userId: string) {
    return await this.favoriteRepo.getUserFavorites(userId);
  }
}
