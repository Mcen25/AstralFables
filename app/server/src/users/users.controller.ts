import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './schemas/users.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: Partial<Users>) {
    return this.usersService.create(createUserDto);
  }
}
