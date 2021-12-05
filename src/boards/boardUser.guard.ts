import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserBoard } from './userBoard.entity';

@Injectable()
export class BoardUserGuard implements CanActivate {
  constructor(
    @Inject('USERBOARDS_REPOSITORY')
    private userBoardRepository: typeof UserBoard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const boardId = request.params.boardId;
    return (
      this.userBoardRepository.findOne({
        where: { boardId: boardId, userId: userId },
      }) !== null
    );
  }
}
