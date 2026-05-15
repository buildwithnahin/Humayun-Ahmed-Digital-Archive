import { db } from '../database';
import { GetWorksQuery } from '../validators/work.validator';

export class WorkRepository {
  async findAllOrSearch(params: GetWorksQuery) {
    const { page = 1, limit = 10, search, category, year } = params;
    const offset = (page - 1) * limit;
    
    let whereClauses = [];
    let values: any[] = [];
    let paramIndex = 1;

    let orderBy = 'ORDER BY publication_year DESC NULLS LAST, title ASC';

    if (search) {
      whereClauses.push(`(
        textsearchable_index_col @@ plainto_tsquery('simple', $${paramIndex}) OR 
        title % $${paramIndex} OR 
        original_title % $${paramIndex}
      )`);
      orderBy = `ORDER BY (
        ts_rank(textsearchable_index_col, plainto_tsquery('simple', $${paramIndex})) + 
        similarity(title, $${paramIndex}) + 
        similarity(original_title, $${paramIndex})
      ) DESC, publication_year DESC NULLS LAST`;
      values.push(search);
      paramIndex++;
    }

    if (category) {
      whereClauses.push(`category = $${paramIndex}`);
      values.push(category);
      paramIndex++;
    }

    if (year) {
      whereClauses.push(`publication_year = $${paramIndex}`);
      values.push(year);
      paramIndex++;
    }

    const whereString = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';
    
    const countQuery = `SELECT COUNT(*) FROM works ${whereString}`;
    const dataQuery = `
      SELECT id, title, original_title, category, publication_year, description, cover_image_url, created_at, updated_at
      FROM works 
      ${whereString} 
      ${orderBy} 
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;
    
    values.push(limit, offset);

    const [countResult, dataResult] = await Promise.all([
      db.query(countQuery, values.slice(0, values.length - 2)), // Exclude limit/offset for count
      db.query(dataQuery, values)
    ]);

    return {
      data: dataResult.rows,
      total: parseInt(countResult.rows[0].count, 10)
    };
  }

  async findById(id: string) {
    const query = 'SELECT * FROM works WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  }
}
