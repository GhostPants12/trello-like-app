import { Controller, Post, Request, Body, Get, Param, Put, Delete, HttpCode, UseGuards, Query} from '@nestjs/common';
import {AuthService} from '../auth/auth.service';
import {BoardDto} from './dto/board.dto';
import {BoardsService} from './boards.service';
import {BoardAdminGuard} from './boardAdmin.guard';
import {BoardUserGuard} from './boardUser.guard';
import {ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNoContentResponse, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import { Board } from './board.entity';

@ApiTags('boards')
@Controller()
export class BoardsController {
    constructor(private authService: AuthService, private boardService : BoardsService) {}

    @ApiCreatedResponse({description: 'Creates the board'})
    @ApiInternalServerErrorResponse({description: 'Internal server error'})
    @ApiUnauthorizedResponse({description : 'Unauthorized'})
    @Post('b')
    async createBoard(@Request() req, @Body() board : BoardDto) {
      return this.boardService.createBoard(req.user.userId, board);
    }


    @ApiOkResponse({type: [Board], description: 'Gets the boards of a user or searches for a board if query is not empty'})
    @ApiInternalServerErrorResponse({description: 'Internal server error'})
    @ApiUnauthorizedResponse({description : 'Unauthorized'})
    @ApiQuery({name: 'search'})
    @Get('/user/boards')
    async getUserBoards(@Request() req, @Query('search') search){
      if(search == null){
        return this.boardService.getUserBoards(req.user.userId);
      }
      
      return this.boardService.searchUserBoards(req.user.userId, search);
    }

    @ApiOkResponse({type: [Board], description: 'Gets the created boards of a user or searches for a created board if query is not empty'})
    @ApiInternalServerErrorResponse({description: 'Internal server error'})
    @ApiUnauthorizedResponse({description : 'Unauthorized'})
    @ApiQuery({name: 'search'})
    @Get('/user/boards/created')
    async getCreatedByUserBoards(@Request() req, @Query('search') search){
      if(search == null){
        return this.boardService.getCreatedByUserBoards(req.user.userId);
      }
      
      return this.boardService.searchCreatedByUserBoards(req.user.userId, search);
    }

    @ApiOkResponse({type: Board, description: 'Gets the board by id'})
    @ApiInternalServerErrorResponse({description: 'Internal server error'})
    @ApiUnauthorizedResponse({description : 'Unauthorized'})
    @UseGuards(BoardUserGuard)
    @Get('/b/:boardId')
    async getBoardById(@Request() req){
      return this.boardService.getBoardById(req.params.boardId);
    }

    @ApiOkResponse({description: 'Updates the board'})
    @ApiInternalServerErrorResponse({description: 'Internal server error'})
    @ApiUnauthorizedResponse({description : 'Unauthorized'})
    @UseGuards(BoardAdminGuard)
    @Put('/b/:boardId')
    async updateBoard(@Request() req, @Body() board : Partial<BoardDto>){
      return this.boardService.updateBoard(req.params.boardId, board);
    }

    @ApiNoContentResponse({description: 'Deletes the board'})
    @ApiInternalServerErrorResponse({description: 'Internal server error'})
    @ApiUnauthorizedResponse({description : 'Unauthorized'})
    @UseGuards(BoardAdminGuard)
    @HttpCode(204)
    @Delete('/b/:boardId')
    async deleteBoard(@Request() req){
      return this.boardService.deleteBoard(req.params.boardId);
    }

    @UseGuards(BoardAdminGuard)
    @ApiCreatedResponse({description: 'Invites user to a board'})
    @ApiInternalServerErrorResponse({description: 'Internal server error'})
    @ApiUnauthorizedResponse({description : 'Unauthorized'})
    @Post('/b/:boardId/user/:username')
    async inviteUser(@Request() req){
      return this.boardService.inviteUser(req.params.boardId, req.params.username);
    }
  }