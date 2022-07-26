import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import Bookmarks from './bookmarks.schema';

@Schema()
class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  refreshToken: string;

  @Prop()
  bookmarks: Bookmarks;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
