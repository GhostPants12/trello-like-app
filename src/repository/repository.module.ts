import { Module, Global } from '@nestjs/common';
import { userBoardsProviders } from '../boards/userBoards.providers';
import { cardsProviders } from '../cards/cards.providers';
import { commentsProviders } from '../comments/comments.providers';

@Global()
@Module({
    providers: [...userBoardsProviders, ...cardsProviders, ...commentsProviders],
    exports: [...userBoardsProviders, ...cardsProviders, ...commentsProviders]
})
export class RepositoryModule {}
