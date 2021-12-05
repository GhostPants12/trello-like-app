import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Comment } from './comment.entity';
import { Card } from '../cards/card.entity';
import { UserBoard } from '../boards/userBoard.entity';

@Injectable()
export class CommentUserGuard implements CanActivate {
  constructor(
    @Inject('USERBOARDS_REPOSITORY')
    private userBoardRepository: typeof UserBoard,
    @Inject('CARDS_REPOSITORY') private cardRepository: typeof Card,
    @Inject('COMMENTS_REPOSITORY') private commentRepository: typeof Comment,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const commentId = request.params.commentId;
    const comment = await this.commentRepository.findByPk(commentId);
    if (comment !== null) {
      const card = await this.cardRepository.findByPk(comment.cardId);
      if (card !== null) {
        return (
          this.userBoardRepository.findOne({
            where: { boardId: card.list.boardId, userId: userId },
          }) !== null
        );
      } else {
        throw new BadRequestException("Comment's card does not exist");
      }
    } else {
      throw new BadRequestException('Comment does not exist');
    }
  }
}
