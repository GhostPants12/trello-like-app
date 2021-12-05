import { Column, HasMany, Model, Table, Unique } from 'sequelize-typescript';
import { UserBoard } from '../boards/userBoard.entity';

@Table
export class Role extends Model<Role> {
  @Unique
  @Column
  rolename: string;

  @HasMany(() => UserBoard)
  userBoards: UserBoard[];
}
