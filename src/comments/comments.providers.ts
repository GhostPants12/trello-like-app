import { Comment } from './comment.entity';

export const commentsProviders = [
  {
    provide: 'COMMENTS_REPOSITORY',
    useValue: Comment,
  },
];
