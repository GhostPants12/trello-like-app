import { Controller, Post, Request, Body, Get, Param, Put, Delete, HttpCode, UseGuards} from '@nestjs/common';
import {AuthService} from '../auth/auth.service';
import {BoardDto} from './dto/board.dto';
import {BoardsService} from './boards.service';
import {BoardAdminGuard} from './boardAdmin.guard';
import {BoardUserGuard} from './boardUser.guard';

@Controller()
export class BoardsController {
    constructor(private authService: AuthService, private boardService : BoardsService) {}

    @Post('b')
    async createBoard(@Request() req, @Body() board : BoardDto) {
      return this.boardService.createBoard(req.user.userId, board);
    }


    @Get('/user/boards')
    async getUserBoards(@Request() req){
        return this.boardService.getUserBoards(req.user.userId);
    }

    @UseGuards(BoardUserGuard)
    @Get('/b/:boardId')
    async getBoardById(@Request() req){
      return this.boardService.getBoardById(req.params.boardId);
    }

    @UseGuards(BoardAdminGuard)
    @Put('/b/:boardId')
    async updateBoard(@Request() req, @Body() board : Partial<BoardDto>){
      return this.boardService.updateBoard(req.params.boardId, board);
    }

    @UseGuards(BoardAdminGuard)
    @HttpCode(204)
    @Delete('/b/:boardId')
    async deleteBoard(@Request() req){
      return this.boardService.deleteBoard(req.params.boardId);
    }

    @UseGuards(BoardAdminGuard)
    @Post('/b/:boardId/user/:username')
    async inviteUser(@Request() req){
      return this.boardService.inviteUser(req.params.boardId, req.params.username);
    }
  }