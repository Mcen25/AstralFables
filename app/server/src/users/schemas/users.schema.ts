import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  _id: ObjectId;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  createdAt: string;

  @Prop()
  updatedAt: string;

  @Prop()
  passwordHash: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);