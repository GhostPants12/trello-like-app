import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Card } from './card.entity';
import { CardDto } from './dto/card.dto';
import { Comment } from '../comments/comment.entity';
import { User } from '../users/user.entity';
import { Board } from '../boards/board.entity';

@Injectable()
export class CardsService {
  constructor(
    @Inject('CARDS_REPOSITORY') private cardRepository: typeof Card,
  ) {}

  async createCard(listId, card: CardDto) {
    if (card.name.length === 0) {
      throw new BadRequestException('Name must be not empty');
    }

    await this.cardRepository.create({
      name: card.name,
      description: card.description,
      listId: listId,
    } as Card);
  }

  async getCardById(cardId) {
    return this.cardRepository.findByPk(cardId, {
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
          attributes: ['id', 'text'],
        },
      ],
    });
  }

  async getUserCards(userId) {
    const result: Array<Card> = [];
    const cards = await this.cardRepository.findAll({
      include: {
        model: Board,
        include: [User],
      },
    });
    cards.filter((card) =>
      card.list.board.users.some((user) => user.id === userId),
    );
    for (const card of cards) {
      result.push(
        await this.cardRepository.findByPk(card.id, { include: [Comment] }),
      );
    }

    return result;
  }

  async searchUserCards(userId, query) {
    const userCards = await this.getUserCards(userId);
    return userCards
      .filter((card) => card.name.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => a.name.length - b.name.length);
  }

  async updateCard(cardId, card: Partial<CardDto>) {
    if ((card.name !== undefined, card.name.length === 0)) {
      throw new BadRequestException('Name must be not empty');
    }

    await this.cardRepository.update(card, { where: { id: cardId } });
  }

  async moveToList(cardId, listId) {
    await this.cardRepository.update(
      { listId: listId },
      { where: { id: cardId } },
    );
  }

  async deleteCard(cardId) {
    await this.cardRepository.destroy({ where: { id: cardId } });
  }
}
