import { Inject, Injectable } from '@nestjs/common';
import { Board } from './board.entity';
import { UserBoard } from './userBoard.entity';
import { BoardDto } from './dto/board.dto';
import { Role } from '../users/role.entity';
import { User } from '../users/user.entity';
import { UsersService } from 'src/users/users.service';
import { ListsService } from '../lists/lists.service';
import { List } from '../lists/list.entity';
import { Card } from '../cards/card.entity';

@Injectable()
export class BoardsService {
  constructor(
    @Inject('BOARDS_REPOSITORY') private boardRepository: typeof Board,
    @Inject('USERBOARDS_REPOSITORY')
    private userBoardRepository: typeof UserBoard,
    @Inject('ROLES_REPOSITORY') private rolesRepository: typeof Role,
    @Inject(UsersService) private usersService,
    @Inject('LISTS_REPOSITORY') private listRepository: typeof List,
  ) {}

  async createBoard(userId: number, board: BoardDto) {
    const createdBoard = await this.boardRepository.create(board as Board);
    console.log(createdBoard);
    const admin = await this.rolesRepository.findOne({
      where: { rolename: 'Admin' },
    });
    console.log(admin);
    await this.listRepository.create({
      name: 'Archive',
      boardId: createdBoard.id,
    } as List);
    await this.userBoardRepository.create({
      userId: userId,
      boardId: createdBoard.id,
      roleId: admin.id,
    } as UserBoard);
  }

  async getRole(userId: number, boardId: number) {
    const userBoards = await this.userBoardRepository.findOne({
      where: {
        boardId: boardId,
        userId: userId,
      },
      include: [
        {
          model: Role,
          attributes: ['rolename'],
        },
      ],
    });

    return userBoards.role;
  }

  async getUserBoards(userId: number) {
    return await this.userBoardRepository
      .findAll({
        where: {
          userId: userId,
        },
      })
      .then(async (userboards) => {
        const boards: Board[] = [];
        for (const userboard of userboards) {
          boards.push(
            await this.boardRepository.findByPk(userboard.boardId, {
              include: [
                {
                  model: List,
                  attributes: ['id', 'name'],
                },
              ],
            }),
          );
        }

        return boards;
      });
  }

  async getCreatedByUserBoards(userId: number) {
    return await this.userBoardRepository
      .findAll({
        where: {
          userId: userId,
          roleId: 2,
        },
      })
      .then(async (userboards) => {
        const boards: Board[] = [];
        for (const userboard of userboards) {
          boards.push(
            await this.boardRepository.findByPk(userboard.boardId, {
              include: [
                {
                  model: List,
                  attributes: ['id', 'name'],
                },
              ],
            }),
          );
        }

        return boards;
      });
  }

  async searchCreatedByUserBoards(userId: number, query: string) {
    const boards = await this.getCreatedByUserBoards(userId);
    return boards
      .filter((board) => board.name.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => a.name.length - b.name.length);
  }

  async searchUserBoards(userId: number, query: string) {
    const boards = await this.getUserBoards(userId);
    return boards
      .filter((board) => board.name.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => a.name.length - b.name.length);
  }

  async getBoardById(boardId: number) {
    return this.boardRepository.findByPk(boardId, {
      include: [
        {
          model: List,
          include: [
            {
              model: Card,
              attributes: ['id', 'name'],
            },
          ],
          attributes: ['id', 'name'],
        },
        {
          model: User,
          attributes: ['id', 'username'],
        },
      ],
    });
  }

  async updateBoard(boardId: number, board: Partial<BoardDto>) {
    await this.boardRepository.update(board, { where: { id: boardId } });
  }

  async deleteBoard(boardId: number) {
    await this.boardRepository.destroy({ where: { id: boardId } });
  }

  async inviteUser(boardId: number, username: string, isObserver: boolean) {
    const rolename = isObserver ? 'Observer' : 'User';
    await this.userBoardRepository.create({
      boardId: boardId,
      userId: (await this.usersService.findOne(username)).id,
      roleId: (
        await this.rolesRepository.findOne({ where: { rolename: rolename } })
      ).id,
    } as UserBoard);
  }
}
