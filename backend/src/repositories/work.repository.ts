import pool from '../database/db';

export class WorkRepository {
  async findAll({ limit, offset, search, category, year }: any) {
    let queryStr = `SELECT * FROM works WHERE 1=1`;
    const queryParams: any[] = [];
    let paramIndex = 1;

    if (search) {
      queryStr += ` AND (title ILIKE $${paramIndex} OR original_title ILIKE $${paramIndex})`;
      queryParams.push(`%${search}%`);
      paramIndex++;
    }

    if (category) {
      queryStr += ` AND category = $${paramIndex}`;
      queryParams.push(category);
      paramIndex++;
    }

    if (year) {
      queryStr += ` AND publication_year = $${paramIndex}`;
      queryParams.push(parseInt(year, 10));
      paramIndex++;
    }

    // Clone query to get total count for pagination
    const countQuery = queryStr.replace('SELECT *', 'SELECT COUNT(*)');
    const { rows: countRows } = await pool.query(countQuery, queryParams);
    const totalCount = parseInt(countRows[0].count, 10);

    queryStr += ` ORDER BY created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    queryParams.push(limit, offset);

    const { rows } = await pool.query(queryStr, queryParams);

    return { data: rows, totalCount };
  }
}
