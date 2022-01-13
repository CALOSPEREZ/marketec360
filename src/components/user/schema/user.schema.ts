import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Role } from 'src/components/role/schema/role.schema';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  lastName: string;

  @Prop({
    unique: true,
  })
  phone: string;

  @Prop({
    unique: true,
  })
  email: string;

  @Prop()
  password?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  role_id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
