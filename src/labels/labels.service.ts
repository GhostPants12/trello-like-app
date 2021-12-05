import { Inject, Injectable } from '@nestjs/common';
import { Label } from './label.entity';
import { LabelDto } from './dto/label.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from '../users/users.service';

@Injectable()
export class LabelsService {
  constructor(
    @Inject('LABELS_REPOSITORY') private labelRepository: typeof Label,
    private readonly mailerService: MailerService,
    @Inject(UsersService) private usersService: UsersService,
  ) {}

  async createlabel(userId: number, cardId: number, label: LabelDto) {
    await this.labelRepository.create({
      cardId: cardId,
      text: label.text,
    } as Label);
  }

  async getlabelById(labelId: number) {
    return this.labelRepository.findByPk(labelId);
  }

  async updatelabel(labelId, label: LabelDto) {
    await this.labelRepository.update(label, { where: { id: labelId } });
  }

  async deletelabel(labelId) {
    await this.labelRepository.destroy({ where: { id: labelId } });
  }
}
