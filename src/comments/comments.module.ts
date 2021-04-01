import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { commentsProviders } from './comments.providers';

@Module({
    imports: [DatabaseModule],
    providers: [...commentsProviders],
})
export class CommentsModule {}
