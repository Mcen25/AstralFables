import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';


@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}
  
    async findAll(): Promise<Users[]> {
      return this.usersModel.find().exec();
    }

    async findOne(id: string): Promise<Users> {
      return this.usersModel.findById(id).exec();
    }

    async create(createUserDto: Users): Promise<Users> {
      const createdUser = new this.usersModel(createUserDto);
      return createdUser.save();
    }

    async update(id: string, updateUserDto: Users): Promise<Users> {
      return this.usersModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    }

    async remove(id: string): Promise<Users> {
      return this.usersModel.findByIdAndDelete(id).exec();
    }
}