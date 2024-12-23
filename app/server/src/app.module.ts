import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    AuthModule, 
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MongoDB_URI,
      synchronize: true, // FIXME: change this later 
      entities: [],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
