import { BadRequestException, HttpException, Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import {User} from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY') private usersRepository: typeof User) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: {username : username}})
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({where : {email : email}});
  }

  async insertOne(user: UserDto) : Promise<void>{
      if (user.password.length < 8){
        throw new BadRequestException('Password must be at least 8 characters');
      }

      const salt = await bcrypt.genSalt();
      this.usersRepository.create({
        username: user.username,
        email: user.email,
        password: await bcrypt.hash(user.password, salt)
      } as User);
  }
}