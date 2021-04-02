import {Injectable, Inject} from '@nestjs/common';
import {Comment} from './comment.entity';
import {CommentDto} from './dto/comment.dto';


@Injectable()
export class CommentsService{
    constructor(@Inject('COMMENTS_REPOSITORY') private commentRepository: typeof Comment) {}

    async createComment(userId: number, cardId: number, comment : CommentDto){
        //TODO: send message if text contains mention
        await this.commentRepository.create({
            userId: userId,
            cardId: cardId,
            text: comment.text
        } as Comment);
    }

    async getCommentById(commentId: number)
    {
        return this.commentRepository.findByPk(commentId);
    }

    async updateComment(commentId, comment: CommentDto){
        await this.commentRepository.update(comment, {where : {id : commentId}});
    }

    async deleteComment(commentId){
        await this.commentRepository.destroy({where : {id : commentId}});
    }
}