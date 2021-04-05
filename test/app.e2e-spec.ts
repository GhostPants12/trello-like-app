import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppController } from './../src/app.controller';
import { AppService } from './../src/app.service';
import {AuthService } from './../src/auth/auth.service';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { LocalStrategy } from '../src/auth/local.strategy';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  let authService = { 
    validateUser: async () => {},
    login: async () => {},
    register: async () => {},
    googleLogin: async () => {}
  }

  let jwtAuthGuard = { 
    canActivate : async () => {true}
  }

  let localStrategy = { 
    validate : async () => {true}
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AppController],
      providers: [AppService, AuthService, LocalStrategy],
    }).overrideProvider(AuthService)
    .useValue(authService)
    .overrideProvider(LocalStrategy)
    .useValue(localStrategy)
    .overrideGuard(JwtAuthGuard)
    .useValue(jwtAuthGuard)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(404);
  });
});
