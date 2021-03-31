import { UserBoard } from './userBoard.entity';

export const userBoardsProviders = [
  {
    provide: 'USERBOARDS_REPOSITORY',
    useValue: UserBoard,
  },
];