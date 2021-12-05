import {
  BelongsToMany,
  Column,
  Is,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Board } from '../boards/board.entity';
import { UserBoard } from '../boards/userBoard.entity';

@Table
export class User extends Model<User> {
  @Is('username', (value: string) => {
    if (value.match(/^[a-z0-9]+$/i) === null) {
      throw new Error('Username can only contain numbers and letters');
    }
  })
  @Unique
  @Column
  username: string;

  @Unique
  @Column
  email: string;

  @Column
  password: string;

  @Column
  googleId: string;

  @BelongsToMany(() => Board, () => UserBoard)
  boards: Board[];
}
