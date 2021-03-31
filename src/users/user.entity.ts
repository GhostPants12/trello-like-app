import { Table, Column, Model, Unique, BelongsToMany } from 'sequelize-typescript';
import {Board} from '../boards/board.entity';
import {UserBoard} from '../boards/userBoard.entity';

@Table
export class User extends Model<User> {  
  @Unique
  @Column
  username: string;

  @Column
  email: string;

  @Column
  password: string;

  @BelongsToMany(() => Board, () => UserBoard)
  boards : Board[];
}