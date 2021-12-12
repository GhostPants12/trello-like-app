import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as http from 'http';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors({
    allowedHeaders: 'Authorization, Content-Type',
    methods: 'GET,PUT,POST,DELETE,OPTIONS,HEAD',
    credentials: true,
    origin: [
      'http://localhost:5000',
      'https://accounts.google.com/o/oauth2/v2/',
      'http://localhost:3000',
      'http://localhost:3000/auth/login/google',
    ],
  });
  await app.init();
  http.createServer(server).listen(3000);
}

bootstrap();
