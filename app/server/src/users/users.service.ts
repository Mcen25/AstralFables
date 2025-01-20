import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Users } from './entities/users.entity'; // Import the Users entity
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private usersRepo: Repository<Users>) {}

  async findUserByName(username: string): Promise<Users | null> {
    const users = await this.usersRepo.find({ where: { username } });
    return users.length > 0 ? users[0] : null;
  }

  async findUserByEmail(email: string): Promise<Users | null> {
    const users = await this.usersRepo.find({ where: { email } });
    return users.length > 0 ? users[0] : null;
  }

  findAll() {
    return this.usersRepo.find();
  }

  findOne(id: string) {
    return this.usersRepo.findOneBy({ _id: new ObjectId(id) } as any);
  }

  async create(createUserDto: Partial<Users>) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.usersRepo.save({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async update(id: string, userData: Partial<Users>) {
    await this.usersRepo.update({ _id: new ObjectId(id) } as any, userData);
    return this.findOne(id);
  }

  remove(id: string) {
    return this.usersRepo.delete({ _id: new ObjectId(id) } as any);
  }

  async findOrCreateGoogleUser(profile: any): Promise<Users> {
    let user = await this.usersRepo.findOne({ where: { email: profile.email } });
    if (!user) {
      user = this.usersRepo.create({
        username: profile.firstName,
        email: profile.email,
        provider: 'google',
        providerId: profile.sub,
      });
      await this.usersRepo.save(user);
    }
    return user;
  }
}