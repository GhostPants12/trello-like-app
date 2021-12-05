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
export class CommentCreatorGuard implements CanActivate {
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
      return comment.author.id === userId;
    } else {
      throw new BadRequestException('Comment does not exist');
    }
  }
}
