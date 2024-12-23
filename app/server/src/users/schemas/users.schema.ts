import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  _id: ObjectId;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password?: string;

  @Prop()
  provider?: string;

  @Prop()
  providerId?: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);

UsersSchema.pre('save', function (next) {
  this.username = this.username.trim();
  next();
});