import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async insertOne(user: any) : Promise<void>{
    if(this.users.some((u) => u.username == user.username)){
      throw new Error('User already exists');
    }

    let newID : number = Math.max.apply(null, this.users.map((u) => u.userId)) + 1;
    this.users.push({
      userId : newID,
      username : user.username,
      password : user.password
    });
  }
}