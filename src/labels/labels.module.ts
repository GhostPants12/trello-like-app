import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { LabelsController } from './labels.controller';
import { labelsProviders } from './labels.providers';
import { LabelsService } from './labels.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { usersProviders } from '../users/users.providers';
import { UsersService } from '../users/users.service';
import { rolesProviders } from '../users/roles.providers';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [LabelsController],
  providers: [
    ...labelsProviders,
    ...usersProviders,
    ...rolesProviders,
    LabelsService,
    UsersService,
  ],
})
export class LabelsModule {}
