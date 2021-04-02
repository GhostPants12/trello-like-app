import {Injectable, CanActivate, ExecutionContext, Inject, BadRequestException} from '@nestjs/common';
import {UserBoard} from '../boards/userBoard.entity';
import {Card} from './card.entity';

@Injectable()
export class CardUserGuard implements CanActivate {
  constructor(@Inject('USERBOARDS_REPOSITORY') private userBoardRepository: typeof UserBoard,
  @Inject('CARDS_REPOSITORY') private cardRepository: typeof Card) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const cardId = request.params.cardId;
    const card = await this.cardRepository.findByPk(cardId);
    if(card !== null){
      return this.userBoardRepository.findOne({where : {boardId : card.boardId, userId : userId}}) !== null;
    }
    else{
      throw new BadRequestException('Card does not exist');
    }
  }
}