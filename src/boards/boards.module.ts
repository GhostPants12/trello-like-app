import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { boardsProviders} from './boards.providers';
import {userBoardsProviders} from './userBoards.providers';

@Module({
    imports: [DatabaseModule],
    providers: [...boardsProviders, ...userBoardsProviders],
})
export class BoardsModule {}
