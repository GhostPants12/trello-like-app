import { Post, Controller, UseGuards, Request, Body, Put, Delete, Get, HttpCode } from "@nestjs/common";
import { CardUserGuard } from "src/cards/cardUser.guard";
import {CommentDto} from './dto/comment.dto';
import {AuthService} from '../auth/auth.service';
import {CommentsService} from './comments.service';
import {CommentCreatorGuard} from './commentCreator.guard';
import {CommentCreatorOrAdminGuard} from './commentCreatorOrAdmin.guard';
import {CommentUserGuard} from './commentUser.guard';
import {ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNoContentResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {Comment} from './comment.entity';

@ApiTags('comments')
@Controller()
export class CommentsController{
    constructor(private authService: AuthService, private commentService: CommentsService) {}

    @UseGuards(CardUserGuard)
    @ApiCreatedResponse({description: 'Creates the comment'})
    @ApiInternalServerErrorResponse({description: 'Internal server error'})
    @ApiUnauthorizedResponse({description : 'Unauthorized'})
    @Post('c/:cardId/comments')
    async createComment(@Request() req, @Body() comment : CommentDto){
        return this.commentService.createComment(req.user.userId, req.params.cardId, comment);
    }

    @UseGuards(CommentUserGuard)
    @ApiOkResponse({type : Comment, description: 'Creates the comment'})
    @ApiInternalServerErrorResponse({description: 'Internal server error'})
    @ApiUnauthorizedResponse({description : 'Unauthorized'})
    @Get('comments/:commentId')
    async getCommentById(@Request() req){
        return this.commentService.getCommentById(req.params.commentId);
    }

    @UseGuards(CommentCreatorGuard)
    @ApiOkResponse({description: 'Updates the comment'})
    @ApiInternalServerErrorResponse({description: 'Internal server error'})
    @ApiUnauthorizedResponse({description : 'Unauthorized'})
    @Put('comments/:commentId')
    async updateComment(@Request() req, @Body() comment : CommentDto){
        return this.commentService.updateComment(req.params.commentId, comment);
    }

    @UseGuards(CommentCreatorOrAdminGuard)
    @HttpCode(204)
    @ApiNoContentResponse({description: 'Deletes the comment'})
    @ApiInternalServerErrorResponse({description: 'Internal server error'})
    @ApiUnauthorizedResponse({description : 'Unauthorized'})
    @Delete('comments/:commentId')
    async deleteComment(@Request() req){
        return this.commentService.deleteComment(req.params.commentId);
    }
}