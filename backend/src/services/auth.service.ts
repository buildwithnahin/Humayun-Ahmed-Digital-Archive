import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import { AppError } from '../middlewares/errorHandler';
import { generateTokens } from '../utils/token';

export class AuthService {
  private userRepo = new UserRepository();

  async register(username: string, email: string, passwordRaw: string) {
    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) {
      throw new AppError('Email already in use', 400);
    }
    
    const passwordHash = await bcrypt.hash(passwordRaw, 12);
    const user = await this.userRepo.create(username, email, passwordHash);
    
    return {
      user,
      tokens: generateTokens(user.id)
    };
  }

  async login(email: string, passwordRaw: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isValid = await bcrypt.compare(passwordRaw, user.password_hash);
    if (!isValid) {
      throw new AppError('Invalid credentials', 401);
    }

    const { password_hash, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      tokens: generateTokens(user.id)
    };
  }
}
