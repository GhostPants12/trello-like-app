import {Body, Controller, Get, Post, Request, UseGuards, Put, Delete, Query, HttpCode} from '@nestjs/common';
import {CardDto} from './dto/card.dto';
import {BoardUserGuard} from '../boards/boardUser.guard';
import { AuthService } from '../auth/auth.service';
import {CardsService} from './cards.service';
import {CardUserGuard} from './cardUser.guard';
import {ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNoContentResponse, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import { Card } from './card.entity';

@ApiTags('cards')
@Controller()
export class CardsController{
    constructor(private authService: AuthService, private cardService : CardsService) {}

    @UseGuards(BoardUserGuard)
    @ApiCreatedResponse({description: 'Creates the card in a board'})
    @ApiInternalServerErrorResponse({description: 'Internal server error'})
    @ApiUnauthorizedResponse({description : 'Unauthorized'})
    @Post('b/:boardId/cards')
    async createCard(@Request() req, @Body() card : CardDto){
        return this.cardService.createCard(req.params.boardId , card);
    }

    @UseGuards(CardUserGuard)
    @ApiOkResponse({description: 'Updates the card'})
    @ApiInternalServerErrorResponse({description: 'Internal server error'})
    @ApiUnauthorizedResponse({description : 'Unauthorized'})
    @Put('c/:cardId')
    async updateCard(@Request() req, @Body() card : Partial<CardDto>){
        return this.cardService.updateCard(req.params.cardId, card);
    }

    @UseGuards(CardUserGuard)
    @ApiNoContentResponse({description: 'Updates the comment'})
    @ApiInternalServerErrorResponse({description: 'Internal server error'})
    @ApiUnauthorizedResponse({description : 'Unauthorized'})
    @HttpCode(204)
    @Delete('c/:cardId')
    async deleteCard(@Request() req){
        return this.cardService.deleteCard(req.params.cardId);
    }

    @ApiOkResponse({type : Card, description: 'Gets the card by id'})
    @ApiInternalServerErrorResponse({description: 'Internal server error'})
    @ApiUnauthorizedResponse({description : 'Unauthorized'})
    @UseGuards(CardUserGuard)
    @Get('c/:cardId')
    async getCardById(@Request() req){
        return this.cardService.getCardById(req.params.cardId);
    }

    @ApiOkResponse({type : [Card], description: 'Gets the cards of logged user or searches for cards if query is not empty'})
    @ApiInternalServerErrorResponse({description: 'Internal server error'})
    @ApiUnauthorizedResponse({description : 'Unauthorized'})
    @ApiQuery({name: 'search'})
    @Get('user/cards')
    async getUserCards(@Request() req, @Query('search') search){
        if(search == null){
        return this.cardService.getUserCards(req.params.userId);
        }

        return this.cardService.searchUserCards(req.params.userId, search);
    }
}