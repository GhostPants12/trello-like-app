import { Table, Column, Model, ForeignKey, HasMany } from 'sequelize-typescript';
import {Board} from '../boards/board.entity';
import {Comment} from '../comments/comment.entity';


@Table
export class Card extends Model<Card> {  
  @Column
  name: string;

  @Column
  description: string;

  @ForeignKey(() => Board)
  @Column
  boardId: number;

  @HasMany(() => Comment)
  comments: Comment[];
}