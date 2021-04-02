import { BadRequestException, Inject, Injectable} from '@nestjs/common';
import {Card} from './card.entity';
import {CardDto} from './dto/card.dto';
import {Comment} from '../comments/comment.entity';
import {User} from '../users/user.entity';

@Injectable()
export class CardsService{
    constructor(@Inject('CARDS_REPOSITORY') private cardRepository: typeof Card) {}

    async createCard(boardId, card : CardDto){
        if(card.name.length === 0){
            throw new BadRequestException('Name must be not empty');
        } 

        await this.cardRepository.create({
            name: card.name,
            description: card.description,
            boardId: boardId
        } as Card);
    }

    async getCardById(cardId){
        return this.cardRepository.findByPk(cardId, {include : [
            {model : Comment,
            include : [{model : User,
                attributes : ['username']}],
            attributes : ['id', 'text']}
        ]
    });
    }

    async updateCard(cardId, card : Partial<CardDto>){
        if(card.name !== undefined, card.name.length === 0){
            throw new BadRequestException('Name must be not empty');
        }

        await this.cardRepository.update(card, {where : {id: cardId}});
    }

    async deleteCard(cardId){
        await this.cardRepository.destroy({where : {id: cardId}});
    }
}