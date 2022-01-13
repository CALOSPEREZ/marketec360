import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
export type CustomerDocument = Customer & mongoose.Document;

@Schema()
export class Customer {
  @Prop({
    unique: true,
  })
  dni: string;
  @Prop()
  dateOfBirth: string;
  @Prop()
  province: string;

  @Prop()
  direction: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
