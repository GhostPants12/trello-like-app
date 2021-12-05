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
import { User } from '../users/user.entity';

@Injectable()
export class CommentCreatorOrAdminGuard implements CanActivate {
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
    const comment = await this.commentRepository.findByPk(commentId, {
      include: User,
    });
    if (comment !== null) {
      if (comment.author.id === userId) {
        return true;
      } else {
        const card = await this.cardRepository.findByPk(comment.cardId);
        if (card !== null) {
          return (
            (
              await this.userBoardRepository.findOne({
                where: {
                  boardId: card.list.boardId,
                  userId: userId,
                },
              })
            ).role.rolename === 'Admin'
          );
        } else {
          throw new BadRequestException("Comment's card does not exist");
        }
      }
    } else {
      throw new BadRequestException('Comment does not exist');
    }
  }
}
