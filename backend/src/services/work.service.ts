import { WorkRepository } from '../repositories/work.repository';
import { GetWorksQuery } from '../validators/work.validator';
import { AppError } from '../middlewares/errorHandler';

export class WorkService {
  private workRepo: WorkRepository;

  constructor() {
    this.workRepo = new WorkRepository();
  }

  async getWorks(params: GetWorksQuery) {
    const { page = 1, limit = 10 } = params;
    
    const { data, total } = await this.workRepo.findAllOrSearch(params);
    
    return {
      works: data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async getWorkById(id: string) {
    const work = await this.workRepo.findById(id);
    if (!work) {
      throw new AppError('Work not found', 404);
    }
    return work;
  }
}
