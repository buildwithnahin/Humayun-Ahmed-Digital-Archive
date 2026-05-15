import { db } from '../database';

export class FavoriteRepository {
  async addFavorite(userId: string, workId: string) {
    const query = `
      INSERT INTO user_favorites (user_id, work_id) 
      VALUES ($1, $2) 
      ON CONFLICT DO NOTHING
      RETURNING *
    `;
    const result = await db.query(query, [userId, workId]);
    return result.rows[0];
  }

  async removeFavorite(userId: string, workId: string) {
    const query = 'DELETE FROM user_favorites WHERE user_id = $1 AND work_id = $2';
    await db.query(query, [userId, workId]);
  }

  async getUserFavorites(userId: string) {
    const query = `
      SELECT w.id, w.title, w.original_title, w.category, w.publication_year 
      FROM works w
      INNER JOIN user_favorites uf ON w.id = uf.work_id
      WHERE uf.user_id = $1
      ORDER BY uf.created_at DESC
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
  }
}
