import { Controller, Get, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from './public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './users/dto/user.dto';
import {ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';

@ApiTags('auth')
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiCreatedResponse({description: 'Gets the jwt token if user data is correct'})
  @ApiInternalServerErrorResponse({description: 'Internal server error'})
  @ApiUnauthorizedResponse({description : 'Unauthorized'})
  @Post('auth/login')
  async login(@Body() body : UserDto) {
    return this.authService.login(body);
  }

  @ApiOkResponse({description: 'Gets the user data'})
  @ApiInternalServerErrorResponse({description: 'Internal server error'})
  @ApiUnauthorizedResponse({description : 'Unauthorized'})
  @Get('user')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @ApiOkResponse({description: 'Gets the jwt token'})
  @ApiInternalServerErrorResponse({description: 'Internal server error'})
  @ApiUnauthorizedResponse({description : 'Unauthorized'})
  @Get('auth/login/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Request() req) {}

  @Public()
  @ApiOkResponse({description: 'Gets the jwt token'})
  @ApiInternalServerErrorResponse({description: 'Internal server error'})
  @ApiUnauthorizedResponse({description : 'Unauthorized'})
  @Get('auth/google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req);
  }

  @Public()
  @ApiCreatedResponse({description: 'Creates the user'})
  @ApiInternalServerErrorResponse({description: 'Internal server error'})
  @ApiBadRequestResponse({description : 'Password must be at least 8 characters'})
  @Post('auth/register')
  register(@Body() user : UserDto) {
    return this.authService.register(user);
  }
}