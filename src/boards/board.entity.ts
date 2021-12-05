import {
  BelongsToMany,
  Column,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { UserBoard } from './userBoard.entity';
import { List } from '../lists/list.entity';

@Table
export class Board extends Model<Board> {
  @Column
  name: string;

  @BelongsToMany(() => User, () => UserBoard)
  users: User[];

  @HasMany(() => List)
  lists: List[];
}
