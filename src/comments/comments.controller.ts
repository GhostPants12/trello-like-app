import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CardUserGuard } from 'src/cards/cardUser.guard';
import { CommentDto } from './dto/comment.dto';
import { AuthService } from '../auth/auth.service';
import { CommentsService } from './comments.service';
import { CommentCreatorGuard } from './commentCreator.guard';
import { CommentCreatorOrAdminGuard } from './commentCreatorOrAdmin.guard';
import { CommentUserGuard } from './commentUser.guard';

@Controller()
export class CommentsController {
  constructor(
    private authService: AuthService,
    private commentService: CommentsService,
  ) {}

  @UseGuards(CardUserGuard)
  @Post('c/:cardId/comments')
  async createComment(@Request() req, @Body() comment: CommentDto) {
    return this.commentService.createComment(
      req.user.userId,
      req.params.cardId,
      comment,
    );
  }

  @UseGuards(CommentUserGuard)
  @Get('comments/:commentId')
  async getCommentById(@Request() req) {
    return this.commentService.getCommentById(req.params.commentId);
  }

  @UseGuards(CommentCreatorGuard)
  @Put('comments/:commentId')
  async updateComment(@Request() req, @Body() comment: CommentDto) {
    return this.commentService.updateComment(req.params.commentId, comment);
  }

  @UseGuards(CommentCreatorOrAdminGuard)
  @Delete('comments/:commentId')
  async deleteComment(@Request() req) {
    return this.commentService.deleteComment(req.params.commentId);
  }
}
