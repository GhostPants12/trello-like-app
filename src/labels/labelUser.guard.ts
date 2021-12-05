import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Label } from './label.entity';
import { Card } from '../cards/card.entity';
import { UserBoard } from '../boards/userBoard.entity';

@Injectable()
export class LabelUserGuard implements CanActivate {
  constructor(
    @Inject('USERBOARDS_REPOSITORY')
    private userBoardRepository: typeof UserBoard,
    @Inject('CARDS_REPOSITORY') private cardRepository: typeof Card,
    @Inject('LABELS_REPOSITORY') private labelRepository: typeof Label,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const labelId = request.params.labelId;
    const label = await this.labelRepository.findByPk(labelId);
    if (label !== null) {
      const card = await this.cardRepository.findByPk(label.cardId);
      if (card !== null) {
        return (
          this.userBoardRepository.findOne({
            where: { boardId: label.card.list.boardId, userId: userId },
          }) !== null
        );
      } else {
        throw new BadRequestException("label's card does not exist");
      }
    } else {
      throw new BadRequestException('label does not exist');
    }
  }
}
