import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CardsController } from './cards.controller';
import { cardsProviders } from './cards.providers';
import { CardsService } from './cards.service';
import {AuthModule} from '../auth/auth.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [CardsController],
    providers: [...cardsProviders, CardsService],
})
export class CardsModule {}