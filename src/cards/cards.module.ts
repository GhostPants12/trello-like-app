import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { cardsProviders } from './cards.providers';

@Module({
    imports: [DatabaseModule],
    providers: [...cardsProviders],
})
export class CardsModule {}