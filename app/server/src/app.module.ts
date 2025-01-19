import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/entities/users.entity'; // Import the Users entity
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'dist'),
    }),
    AuthModule, 
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MongoDB_URI,
      synchronize: false, // FIXME: change this later 
      entities: [Users], // Register the Users entity
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}