import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Comment } from '../comments/comment.entity';
import { List } from '../lists/list.entity';

@Table
export class Card extends Model<Card> {
  @Column
  name: string;

  @Column
  description: string;

  @ForeignKey(() => List)
  @Column
  listId: number;

  @BelongsTo(() => List, 'listId')
  list: List;

  @HasMany(() => Comment)
  comments: Comment[];
}
