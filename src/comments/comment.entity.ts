import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import {User} from '../users/user.entity';
import {Card} from '../cards/card.entity';
import { ApiProperty } from '@nestjs/swagger';


@Table
export class Comment extends Model<Comment> {
  @ApiProperty()  
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