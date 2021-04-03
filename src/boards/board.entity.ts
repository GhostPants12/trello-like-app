import { Table, Column, Model, HasMany, BelongsToMany} from 'sequelize-typescript';
import {User} from '../users/user.entity';
import {UserBoard} from './userBoard.entity';
import {Card} from '../cards/card.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class Board extends Model<Board> {
  @ApiProperty()  
  @Column
  name: string;

  @BelongsToMany(() => User, () => UserBoard)
  users : User[];

  @HasMany(() => Card)
  cards : Card[];
}