import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserBoard } from '../boards/userBoard.entity';
import { List } from './list.entity';

@Injectable()
export class ListUserGuard implements CanActivate {
  constructor(
    @Inject('USERBOARDS_REPOSITORY')
    private userBoardRepository: typeof UserBoard,
    @Inject('LISTS_REPOSITORY') private listRepository: typeof List,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const listId = request.params.listId;
    const list = await this.listRepository.findByPk(listId);
    if (list !== null) {
      return (
        this.userBoardRepository.findOne({
          where: { boardId: list.boardId, userId: userId },
        }) !== null
      );
    } else {
      throw new BadRequestException('List does not exist');
    }
  }
}
