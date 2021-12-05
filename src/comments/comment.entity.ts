import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { Card } from '../cards/card.entity';

@Table
export class Comment extends Model<Comment> {
  @Column
  text: string;

  @ForeignKey(() => Card)
  @Column
  cardId: number;

  @BelongsTo(() => Card, 'cardId')
  card: Card;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User, 'userId')
  author: User;
}
