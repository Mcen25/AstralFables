import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Model } from 'mongoose';
import { Users } from './schemas/users.schema';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
    constructor() {
        // @InjectModel(Users.name) 
        // private usersModel: Model<UsersDocument>,
    }
}
