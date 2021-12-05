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
import { ListDto } from './dto/list.dto';
import { BoardUserGuard } from '../boards/boardUser.guard';
import { AuthService } from '../auth/auth.service';
import { ListsService } from './lists.service';
import { ListUserGuard } from './listUser.guard';

@Controller()
export class ListsController {
  constructor(
    private authService: AuthService,
    private listsService: ListsService,
  ) {}

  @UseGuards(BoardUserGuard)
  @Post('b/:boardId/lists')
  async createList(@Request() req, @Body() List: ListDto) {
    return this.listsService.createList(req.params.boardId, List);
  }

  @UseGuards(ListUserGuard)
  @Put('l/:listId')
  async updateList(@Request() req, @Body() List: Partial<ListDto>) {
    return this.listsService.updateList(req.params.listId, List);
  }

  @UseGuards(ListUserGuard)
  @Delete('l/:listId')
  async deleteList(@Request() req) {
    return this.listsService.deleteList(req.params.listId);
  }

  @UseGuards(ListUserGuard)
  @Get('l/:ListId')
  async getListById(@Request() req) {
    return this.listsService.getListById(req.params.listId);
  }
}
