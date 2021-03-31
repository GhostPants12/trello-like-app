import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import {rolesProviders} from './roles.providers';
import {DatabaseModule} from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, ...usersProviders, ...rolesProviders],
  exports: [UsersService],
})
export class UsersModule {}