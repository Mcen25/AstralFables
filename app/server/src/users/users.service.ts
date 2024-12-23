import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Users } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private usersRepo: Repository<Users>) {}

  findAll() {
    return this.usersRepo.find();
  }

  findOne(id: string) {
    return this.usersRepo.findOneBy({ _id: new ObjectId(id) } as any);
  }

  async create(createUsersDto: Partial<Users>) {
    const user = this.usersRepo.create(createUsersDto);
    return await this.usersRepo.save(user);
  }

  async update(id: string, userData: Partial<Users>) {
    await this.usersRepo.update({ _id: new ObjectId(id) } as any, userData);
    return this.findOne(id);
  }

  remove(id: string) {
    return this.usersRepo.delete({ _id: new ObjectId(id) } as any);
  }
}