import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { Board } from './board.entity';
import { Role } from '../users/role.entity';

@Table
export class UserBoard extends Model<UserBoard> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Board)
  @Column
  boardId: number;

  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;
}
