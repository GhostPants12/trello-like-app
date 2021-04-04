import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { BoardsModule } from './boards/boards.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { RepositoryModule } from './repository/repository.module';
import { HttpsRedirectMiddleware } from '@kittgen/nestjs-https-redirect';

@Module({
  imports: [AuthModule, UsersModule, DatabaseModule, BoardsModule, CardsModule, CommentsModule, RepositoryModule],
  controllers: [AppController],
  providers: [AppService, 
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  configure(consumer : MiddlewareConsumer){
    consumer.apply(HttpsRedirectMiddleware({ enabled: true })).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
