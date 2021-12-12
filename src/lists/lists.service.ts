import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { List } from './list.entity';
import { ListDto } from './dto/list.dto';
import { Card } from '../cards/card.entity';
import { Comment } from '../comments/comment.entity';
import { User } from '../users/user.entity';
import { Board } from '../boards/board.entity';

@Injectable()
export class ListsService {
  constructor(
    @Inject('LISTS_REPOSITORY') private ListRepository: typeof List,
  ) {}

  async createList(boardId, List: ListDto) {
    if (List.name.length === 0) {
      throw new BadRequestException('Name must be not empty');
    }

    await this.ListRepository.create({
      name: List.name,
      boardId: boardId,
    } as List);
  }

  async getBoardLists(BoardId) {
    return this.ListRepository.findAll({
      where: { boardId: BoardId },
      include: [
        {
          model: Card,
          include: [
            {
              model: Comment,
              attributes: ['text', 'userId'],
            },
          ],
          attributes: ['id', 'text'],
        },
      ],
    });
  }

  async getListById(ListId) {
    return this.ListRepository.findByPk(ListId, {
      include: [
        {
          model: Card,
          include: [
            {
              model: Comment,
              attributes: ['text', 'userId'],
            },
          ],
          attributes: ['id', 'name', 'description'],
        },
      ],
    });
  }

  async updateList(ListId, List: Partial<ListDto>) {
    if ((List.name !== undefined, List.name.length === 0)) {
      throw new BadRequestException('Name must be not empty');
    }

    await this.ListRepository.update(List, { where: { id: ListId } });
  }

  async deleteList(ListId) {
    await this.ListRepository.destroy({ where: { id: ListId } });
  }
}
