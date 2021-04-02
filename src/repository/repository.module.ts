import { Module, Global } from '@nestjs/common';
import { userBoardsProviders } from 'src/boards/userBoards.providers';
import { cardsProviders } from 'src/cards/cards.providers';

@Global()
@Module({
    providers: [...userBoardsProviders, ...cardsProviders],
    exports: [...userBoardsProviders, ...cardsProviders]
})
export class RepositoryModule {}
