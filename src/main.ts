import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as express from 'express';
import {ExpressAdapter} from '@nestjs/platform-express';
import * as http from 'http';
import * as https from 'https';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const httpsOptions = {
  key: fs.readFileSync(process.env.SSH_KEY_PATH, 'utf8'),
  cert: fs.readFileSync(process.env.SSH_CERT_PATH, 'utf8'),
  passphrase: process.env.SSH_PASSPHRASE
};

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  const config = new DocumentBuilder()
    .setTitle('Trello-like-app')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('boards')
    .addTag('cards')
    .addTag('comments')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.init();
  http.createServer(server).listen(3000);
  https.createServer(httpsOptions, server).listen(443);
}
bootstrap();
