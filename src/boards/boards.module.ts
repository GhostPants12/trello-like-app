import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { boardsProviders } from './boards.providers';
import { userBoardsProviders } from './userBoards.providers';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { rolesProviders } from '../users/roles.providers';
import { AuthModule } from '../auth/auth.module';
import { UsersService } from '../users/users.service';
import { usersProviders } from 'src/users/users.providers';
import { listsProviders } from '../lists/lists.providers';

@Module({
  controllers: [BoardsController],
  imports: [DatabaseModule, AuthModule],
  providers: [
    ...usersProviders,
    ...boardsProviders,
    ...userBoardsProviders,
    ...rolesProviders,
    ...listsProviders,
    BoardsService,
    UsersService,
  ],
})
export class BoardsModule {}
