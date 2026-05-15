import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { verifyRefreshToken, generateTokens } from '../utils/token';

export class AuthController {
  private authService = new AuthService();

  private setCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000 // 15 mins
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password } = req.body;
      const { user, tokens } = await this.authService.register(username, email, password);
      
      this.setCookies(res, tokens.accessToken, tokens.refreshToken);
      
      res.status(201).json({ success: true, data: { user } });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const { user, tokens } = await this.authService.login(email, password);

      this.setCookies(res, tokens.accessToken, tokens.refreshToken);

      res.status(200).json({ success: true, data: { user } });
    } catch (error) {
      next(error);
    }
  };

  refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(401).json({ success: false, error: { message: 'No refresh token' } });
      }

      const decoded = verifyRefreshToken(refreshToken);
      const tokens = generateTokens(decoded.userId);
      
      this.setCookies(res, tokens.accessToken, tokens.refreshToken);
      
      res.status(200).json({ success: true, message: 'Token refreshed' });
    } catch (error) {
      // Clear cookies if refresh fails
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      res.status(401).json({ success: false, error: { message: 'Invalid refresh token' } });
    }
  };

  logout = async (req: Request, res: Response) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  };
}
