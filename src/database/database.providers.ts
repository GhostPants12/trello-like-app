import { Sequelize } from 'sequelize-typescript';
import {User} from '../users/user.entity';
import {Board} from '../boards/board.entity';
import {UserBoard} from '../boards/userBoard.entity';
import {Role} from '../users/role.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);
      sequelize.addModels([User, Board, UserBoard, Role]);
      await sequelize.sync();
      return sequelize;
    },
  },
];