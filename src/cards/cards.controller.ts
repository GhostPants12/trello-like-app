import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CardDto } from './dto/card.dto';
import { BoardUserGuard } from '../boards/boardUser.guard';
import { AuthService } from '../auth/auth.service';
import { CardsService } from './cards.service';
import { CardUserGuard } from './cardUser.guard';

@Controller()
export class CardsController {
  constructor(
    private authService: AuthService,
    private cardService: CardsService,
  ) {}

  @UseGuards(BoardUserGuard)
  @Post('l/:listId/cards')
  async createCard(@Request() req, @Body() card: CardDto) {
    return this.cardService.createCard(req.params.listId, card);
  }

  @UseGuards(CardUserGuard)
  @Put('c/:cardId')
  async updateCard(@Request() req, @Body() card: Partial<CardDto>) {
    return this.cardService.updateCard(req.params.cardId, card);
  }

  @UseGuards(CardUserGuard)
  @Delete('c/:cardId')
  async deleteCard(@Request() req) {
    return this.cardService.deleteCard(req.params.cardId);
  }

  @UseGuards(CardUserGuard)
  @Get('c/:cardId')
  async getCardById(@Request() req) {
    return this.cardService.getCardById(req.params.cardId);
  }

  @Get('user/cards')
  async getUserCards(@Request() req, @Query('search') search) {
    if (search == null) {
      return this.cardService.getUserCards(req.params.userId);
    }

    return this.cardService.searchUserCards(req.params.userId, search);
  }
}
