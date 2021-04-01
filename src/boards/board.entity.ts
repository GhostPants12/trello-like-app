import { Table, Column, Model, HasMany, BelongsToMany} from 'sequelize-typescript';
import {User} from '../users/user.entity';
import {UserBoard} from './userBoard.entity';
import {Card} from '../cards/card.entity';

@Table
export class Board extends Model<Board> {  
  @Column
  name: string;

  @BelongsToMany(() => User, () => UserBoard)
  users : User[];

  @HasMany(() => Card)
  cards : Card[];
}