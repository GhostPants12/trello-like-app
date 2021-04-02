import { Module, Global } from '@nestjs/common';
import { userBoardsProviders } from 'src/boards/userBoards.providers';
import { cardsProviders } from 'src/cards/cards.providers';
import { commentsProviders } from 'src/comments/comments.providers';

@Global()
@Module({
    providers: [...userBoardsProviders, ...cardsProviders, ...commentsProviders],
    exports: [...userBoardsProviders, ...cardsProviders, ...commentsProviders]
})
export class RepositoryModule {}
