import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';


export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async insertOne(user: UserDto) : Promise<void>{
    if(this.users.some((u) => u.username == user.username)){
      throw new BadRequestException('User already exists');
    }


    let idArr = this.users.map((u) => u.userId);
    let newID : number = idArr.length > 0 ? Math.max.apply(null, idArr) + 1 : 1;
    const salt = await bcrypt.genSalt();
    this.users.push({
      userId : newID,
      username : user.username,
      email : user.email,
      password :  await bcrypt.hash(user.password, salt)
    });
  }
}