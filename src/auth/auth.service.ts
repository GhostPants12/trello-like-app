import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Partial<UserDto> | null> {
    const user = await this.usersService.findOne(username);
    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    console.log('1');
    let user = await this.usersService.findByEmail(req.user.email);
    console.log('2');
    if (!user) {
      const newUser: UserDto = {
        googleId: req.user.id,
        email: req.user.email,
        username: req.user.email.split('@')[0].replace(/[^a-z\d\s]+/gi, ''),
      };

      await this.usersService.insertOne(newUser);
      user = await this.usersService.findByEmail(req.user.email);
    }

    return this.login(user);
  }

  async login(user: UserDto) {
    const userRecord = await this.usersService.findOne(user.username);
    const payload = { username: userRecord.username, sub: userRecord.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: UserDto) {
    await this.usersService.insertOne(user);
  }
}
