import {Injectable, Inject} from '@nestjs/common';
import {Comment} from './comment.entity';
import {CommentDto} from './dto/comment.dto';
import {MailerService} from '@nestjs-modules/mailer'
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import {Card} from '../cards/card.entity';
import {Board} from '../boards/board.entity';

@Injectable()
export class CommentsService{
    constructor(@Inject('COMMENTS_REPOSITORY') private commentRepository: typeof Comment,
    private readonly mailerService: MailerService,
    @Inject( UsersService) private usersService : UsersService) {}

    async createComment(userId: number, cardId: number, comment : CommentDto){
        //TODO: send message if text contains mention
        let commentRecord = await this.commentRepository.create({
            userId: userId,
            cardId: cardId,
            text: comment.text
        } as Comment);

        commentRecord = await this.commentRepository.findByPk(commentRecord.id, {include : {all: true, nested: true}});
        const mentionRe = /@[a-z0-9]+/i;
        const mentions = comment.text.match(mentionRe);
        if(mentions === null){
            return;
        }
        for(let user of mentions){
            const userRecord = await this.usersService.findOne(user.substring(1));
            if(userRecord !== null && commentRecord.card.board.users.some((user) => user.id == userRecord.id)){
                this.mailerService.sendMail({
                    from : process.env.EMAIL,
                    to : userRecord.email,
                    subject: `User ${commentRecord.author.username} mentioned you in a comment`,
                    text: JSON.stringify({
                        author : commentRecord.author.username,
                        board : commentRecord.card.board.name,
                        card : commentRecord.card.name,
                        text : commentRecord.text
                    }),
                    html : `<p>User <b>${commentRecord.author.username}</b> mentioned you in a card <b>${commentRecord.card.name}</b> in a board <b>${commentRecord.card.board.name}</b>.
                    </p><p>Here you can take a look at it:</p> 
                    <p style="text-indent: 1.5em">  ${commentRecord.text}</p>`
                });
            }
        }
    }

    async getCommentById(commentId: number)
    {
        return this.commentRepository.findByPk(commentId);
    }

    async updateComment(commentId, comment: CommentDto){
        await this.commentRepository.update(comment, {where : {id : commentId}});
        const commentRecord = await this.commentRepository.findByPk(commentId, {include : {all: true, nested: true}})
        const mentionRe = /@[a-z0-9]+/i;
        const mentions = comment.text.match(mentionRe);
        for(let user of mentions){
            const userRecord = await this.usersService.findOne(user.substring(1));
            if(userRecord !== null && commentRecord.card.board.users.some((user) => user.id == userRecord.id)){
                this.mailerService.sendMail({
                    from : process.env.EMAIL,
                    to : userRecord.email,
                    subject: `User ${commentRecord.author.username} mentioned you in a comment`,
                    text: JSON.stringify({
                        author : commentRecord.author.username,
                        board : commentRecord.card.board.name,
                        card : commentRecord.card.name,
                        text : commentRecord.text
                    }),
                    html : `<p>User <b>${commentRecord.author.username}</b> mentioned you in a card <b>${commentRecord.card.name}</b> in a board <b>${commentRecord.card.board.name}</b>.
                    </p><p>Here you can take a look at it:</p> 
                    <p style="text-indent: 1.5em">  ${commentRecord.text}</p>`
                });
            }
        }
    }

    async deleteComment(commentId){
        await this.commentRepository.destroy({where : {id : commentId}});
    }
}