import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { CommentsController } from './comments.controller';
import { commentsProviders } from './comments.providers';
import { CommentsService } from './comments.service';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [CommentsController],
    providers: [...commentsProviders, CommentsService],
})
export class CommentsModule {}
