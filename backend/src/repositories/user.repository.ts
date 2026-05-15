import { db } from '../database';

export class UserRepository {
  async findByEmail(email: string) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
  }

  async findById(id: string) {
    const query = 'SELECT id, username, email, created_at FROM users WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  async create(username: string, email: string, passwordHash: string) {
    const query = `
      INSERT INTO users (username, email, password_hash) 
      VALUES ($1, $2, $3) 
      RETURNING id, username, email, created_at
    `;
    const result = await db.query(query, [username, email, passwordHash]);
    return result.rows[0];
  }
}
