import { Table, Column, Model, Unique, BelongsToMany, Is } from 'sequelize-typescript';
import {Board} from '../boards/board.entity';
import {UserBoard} from '../boards/userBoard.entity';

@Table
export class User extends Model<User> {
  @Is('username', (value : string) => {
    if(value.match(/^[a-z0-9]+$/i) === null){
      throw new Error('Username can only contain numbers and letters');
    }
  })  
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