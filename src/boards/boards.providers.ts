import { Board } from './board.entity';

export const boardsProviders = [
  {
    provide: 'BOARDS_REPOSITORY',
    useValue: Board,
  },
];