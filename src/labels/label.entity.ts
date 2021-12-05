import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Card } from '../cards/card.entity';

@Table
export class Label extends Model<Label> {
  @Column
  text: string;

  @ForeignKey(() => Card)
  @Column
  cardId: number;

  @BelongsTo(() => Card, 'cardId')
  card: Card;
}
