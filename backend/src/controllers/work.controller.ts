import { Request, Response, NextFunction } from 'express';
import { WorkService } from '../services/work.service';
import { GetWorksQuery } from '../validators/work.validator';

export class WorkController {
  private workService: WorkService;

  constructor() {
    this.workService = new WorkService();
  }

  getWorks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryParams = req.query as unknown as GetWorksQuery;
      const result = await this.workService.getWorks(queryParams);
      
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  };

  getWorkById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const work = await this.workService.getWorkById(id);
      
      res.status(200).json({
        success: true,
        data: work
      });
    } catch (error) {
      next(error);
    }
  };
}
