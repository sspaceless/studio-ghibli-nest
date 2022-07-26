import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import AppController from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/ghibli'),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
