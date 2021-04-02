import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { CommentsController } from './comments.controller';
import { commentsProviders } from './comments.providers';
import { CommentsService } from './comments.service';
import { MailerModule} from '@nestjs-modules/mailer';
import { usersProviders } from '../users/users.providers';
import { UsersService } from '../users/users.service';
import {rolesProviders} from '../users/roles.providers';

@Module({
    imports: [DatabaseModule, AuthModule, 
        MailerModule.forRoot({
        transport: {
          service : process.env.MAIL_SERVICE, 
          auth : { 
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
          }
        }
      })],
    controllers: [CommentsController],
    providers: [...commentsProviders, ...usersProviders, ...rolesProviders, CommentsService, UsersService],
})
export class CommentsModule {}
