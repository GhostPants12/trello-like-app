import { Table, Column, Model, HasOne, BelongsToMany} from 'sequelize-typescript';
import {User} from '../users/user.entity';
import {UserBoard} from './userBoard.entity';

@Table
export class Board extends Model<Board> {  
  @Column
  name: string;

  @BelongsToMany(() => User, () => UserBoard)
  users : User[];
}