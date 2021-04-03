import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model, ForeignKey, HasMany, BelongsTo } from 'sequelize-typescript';
import {Board} from '../boards/board.entity';
import {Comment} from '../comments/comment.entity';


@Table
export class Card extends Model<Card> {
  @ApiProperty()  
  @Column
  name: string;

  @ApiProperty()
  @Column
  description: string;

  @ForeignKey(() => Board)
  @Column
  boardId: number;

  @BelongsTo(() => Board, 'boardId')
  board : Board;

  @HasMany(() => Comment)
  comments: Comment[];
}