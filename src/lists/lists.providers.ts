import { List } from './list.entity';

export const listsProviders = [
  {
    provide: 'LISTS_REPOSITORY',
    useValue: List,
  },
];
