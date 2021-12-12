import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { Role } from './role.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY') private usersRepository: typeof User,
    @Inject('ROLES_REPOSITORY') private rolesRepository: typeof Role,
  ) {}

  async findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username: username } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email: email } });
  }

  async insertOne(user: UserDto): Promise<void> {
    if (user.password && user.password.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters');
    }

    if (!user.password && !user.googleId) {
      throw new BadRequestException('No password or googleId provided');
    }

    try {
      if (!user.password) {
        await this.usersRepository.create({
          username: user.username,
          email: user.email,
          googleId: user.googleId,
        } as User);
      } else {
        const salt = await bcrypt.genSalt();
        await this.usersRepository.create({
          username: user.username,
          email: user.email,
          password: await bcrypt.hash(user.password, salt),
        } as User);
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
