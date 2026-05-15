import { WorkRepository } from '../repositories/work.repository';
import { GetWorksQuery } from '../validations/work.schema';

const workRepository = new WorkRepository();

export class WorkService {
  async getWorks(query: GetWorksQuery) {
    const page = parseInt(query.page || '1', 10);
    const limit = parseInt(query.limit || '10', 10);
    const offset = (page - 1) * limit;

    const { data, totalCount } = await workRepository.findAll({
      limit,
      offset,
      search: query.search,
      category: query.category,
      year: query.year,
    });

    return {
      works: data,
      meta: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  }
}
