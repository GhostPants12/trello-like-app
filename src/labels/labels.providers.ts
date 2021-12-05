import { Label } from './label.entity';

export const labelsProviders = [
  {
    provide: 'LABELS_REPOSITORY',
    useValue: Label,
  },
];
