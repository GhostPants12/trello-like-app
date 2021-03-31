import { Table, Column, Model, Unique } from 'sequelize-typescript';

@Table
export class User extends Model<User> {  
  @Unique
  @Column
  username: string;

  @Column
  email: string;

  @Column
  password: string;
}