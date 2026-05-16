import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories/user.repository';

export class UserController {
  private userRepository = new UserRepository();

  getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.userId;
      
      if (!userId) {
        return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
      }

      const user = await this.userRepository.findById(userId);

      
      if (!user) {
        return res.status(404).json({ success: false, error: { message: 'User not found' } });
      }

      res.status(200).json({ success: true, data: { user } });
    } catch (error) {
      next(error);
    }
  };
}
