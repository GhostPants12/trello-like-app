import { Module, Global } from '@nestjs/common';
import { userBoardsProviders } from 'src/boards/userBoards.providers';

@Global()
@Module({
    providers: [...userBoardsProviders],
    exports: [...userBoardsProviders]
})
export class RepositoryModule {}
