import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Board } from '../boards/board.entity';
import { Card } from '../cards/card.entity';

@Table
export class List extends Model<List> {
  @Column
  name: string;

  @ForeignKey(() => Board)
  @Column
  boardId: number;

  @BelongsTo(() => Board, 'boardId')
  board: Board;

  @HasMany(() => Card)
  cards: Card[];
}
