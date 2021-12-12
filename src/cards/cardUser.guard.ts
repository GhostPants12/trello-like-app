import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserBoard } from '../boards/userBoard.entity';
import { Card } from './card.entity';
import { List } from '../lists/list.entity';

@Injectable()
export class CardUserGuard implements CanActivate {
  constructor(
    @Inject('USERBOARDS_REPOSITORY')
    private userBoardRepository: typeof UserBoard,
    @Inject('CARDS_REPOSITORY') private cardRepository: typeof Card,

    @Inject('LISTS_REPOSITORY') private listRepository: typeof List,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const cardId = request.params.cardId;
    const card = await this.cardRepository.findByPk(cardId);
    const list = await this.listRepository.findByPk(card.listId);
    console.log(list);
    if (card !== null) {
      return (
        (await this.userBoardRepository.findOne({
          where: { boardId: list.boardId, userId: userId },
        })) !== null
      );
    } else {
      throw new BadRequestException('Card does not exist');
    }
  }
}
