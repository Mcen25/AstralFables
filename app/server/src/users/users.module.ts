import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './schemas/users.schema';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
