import { Controller, Get, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from './public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './users/dto/user.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() body) {
    return this.authService.login(body);
  }

  @Get('user')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Get('auth/login/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Request() req) {}

  @Public()
  @Get('auth/google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req);
  }

  @Public()
  @Post('auth/register')
  register(@Body() user : UserDto) {
    return this.authService.register(user);
  }
}