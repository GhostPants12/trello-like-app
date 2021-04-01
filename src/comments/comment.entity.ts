import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import {User} from '../users/user.entity';
import {Card} from '../cards/card.entity';


@Table
export class Comment extends Model<Comment> {  
  @Column
  text: string;

  @ForeignKey(() => Card)
  @Column
  cardId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;
}