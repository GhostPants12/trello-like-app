import { Sequelize } from 'sequelize-typescript';
import {User} from '../users/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];