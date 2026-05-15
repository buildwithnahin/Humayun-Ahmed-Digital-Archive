import { Request, Response, NextFunction } from 'express';
import { WorkService } from '../services/work.service';
import { sendResponse } from '../utils/response';
import { GetWorksQuery } from '../validations/work.schema';

const workService = new WorkService();

export class WorkController {
  async getWorks(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query as unknown as GetWorksQuery;
      const result = await workService.getWorks(query);

      sendResponse(
        res,
        200,
        'Works fetched successfully',
        result.works,
        result.meta
      );
    } catch (error) {
      next(error);
    }
  }
}
