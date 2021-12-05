import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ListsController } from './lists.controller';
import { listsProviders } from './lists.providers';
import { ListsService } from './lists.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ListsController],
  providers: [...listsProviders, ListsService],
})
export class ListsModule {}
