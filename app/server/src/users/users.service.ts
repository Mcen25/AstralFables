import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

    async create(createUserDto: CreateUserDto): Promise<Users> {
      const createdUser = new this.usersModel(createUserDto);
      return createdUser.save();
    }
  
    async findAll(): Promise<Users[]> {
      return this.usersModel.find().exec();
    }
}