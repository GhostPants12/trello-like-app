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
import { LabelDto } from './dto/label.dto';
import { AuthService } from '../auth/auth.service';
import { LabelsService } from './labels.service';
import { LabelUserGuard } from './labelUser.guard';

@Controller()
export class LabelsController {
  constructor(
    private authService: AuthService,
    private labelService: LabelsService,
  ) {}

  @UseGuards(CardUserGuard)
  @Post('c/:cardId/labels')
  async createlabel(@Request() req, @Body() label: LabelDto) {
    return this.labelService.createlabel(
      req.user.userId,
      req.params.cardId,
      label,
    );
  }

  @Get('labels/:labelId')
  async getlabelById(@Request() req) {
    return this.labelService.getlabelById(req.params.labelId);
  }

  @Put('labels/:labelId')
  async updatelabel(@Request() req, @Body() label: LabelDto) {
    return this.labelService.updatelabel(req.params.labelId, label);
  }

  @Delete('labels/:labelId')
  async deletelabel(@Request() req) {
    return this.labelService.deletelabel(req.params.labelId);
  }
}
