import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import {Board} from '../boards/board.entity';


@Table
export class Card extends Model<Card> {  
  @Column
  name: string;

  @Column
  description: string;

  @ForeignKey(() => Board)
  @Column
  boardId: number;
}