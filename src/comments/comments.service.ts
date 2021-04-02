import {Injectable, Inject} from '@nestjs/common';
import {Comment} from './comment.entity';
import {CommentDto} from './dto/comment.dto';
import {MailerService} from '@nestjs-modules/mailer'
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class CommentsService{
    constructor(@Inject('COMMENTS_REPOSITORY') private commentRepository: typeof Comment,
    private readonly mailerService: MailerService,
    @Inject( UsersService) private usersService) {}

    async createComment(userId: number, cardId: number, comment : CommentDto){
        //TODO: send message if text contains mention
        let commentRecord = await this.commentRepository.create({
            userId: userId,
            cardId: cardId,
            text: comment.text
        } as Comment);

        commentRecord = await this.commentRepository.findByPk(commentRecord.id, {include : User})
        const mentionRe = /@[a-z0-9]+/i;
        const mentions = comment.text.match(mentionRe);
        for(let user of mentions){
            const userRecord = this.usersService.findOne(user.substring(1));
            if(userRecord != null){
                this.mailerService.sendMail({
                    from : process.env.EMAIL,
                    to : (await userRecord).email,
                    subject: 'Someone mentioned you in a comment',
                    text: JSON.stringify({
                        author : commentRecord.author.username,
                        text : commentRecord.text
                    }),
                    html : `<p>Here you can take a look at it:</p> <p style="text-indent: 1.5em"><b>Author</b>: ${commentRecord.author.username}</p> <p style="text-indent: 1.5em">  ${commentRecord.text}</p>`
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
        const commentRecord = await this.commentRepository.findByPk(commentId, {include : User})
        const mentionRe = /@[a-z0-9]+/i;
        const mentions = comment.text.match(mentionRe);
        for(let user of mentions){
            const userRecord = this.usersService.findOne(user.substring(1));
            if(userRecord != null){
                this.mailerService.sendMail({
                    from : process.env.EMAIL,
                    to : (await userRecord).email,
                    subject: 'Someone mentioned you in a comment',
                    text: JSON.stringify({
                        author : commentRecord.author.username,
                        text : commentRecord.text
                    }),
                    html : `<p>Here you can take a look at it:</p> <p style="text-indent: 1.5em"><b>Author</b>: ${commentRecord.author.username}</p> <p style="text-indent: 1.5em">  ${commentRecord.text}</p>`
                });
            }
        }
    }

    async deleteComment(commentId){
        await this.commentRepository.destroy({where : {id : commentId}});
    }
}