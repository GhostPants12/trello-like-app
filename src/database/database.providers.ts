import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { Board } from '../boards/board.entity';
import { UserBoard } from '../boards/userBoard.entity';
import { Role } from '../users/role.entity';
import { Comment } from '../comments/comment.entity';
import { Card } from '../cards/card.entity';
import { List } from '../lists/list.entity';
import { Label } from '../labels/label.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);
      sequelize.addModels([
        Role,
        User,
        Board,
        UserBoard,
        Comment,
        Card,
        List,
        Label,
      ]);
      await sequelize.sync();
      Role.create({
        rolename: 'User',
      } as Role).then(() => {
        console.log('User role inserted');
      });
      Role.create({
        rolename: 'Admin',
      } as Role).then(() => {
        console.log('Admin role inserted');
      });
      Role.create({
        rolename: 'Observer',
      } as Role).then(() => {
        console.log('Observer role inserted');
      });
      return sequelize;
    },
  },
];
