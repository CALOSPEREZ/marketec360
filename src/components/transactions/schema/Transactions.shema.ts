import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
export type transactionsDocument = Transactions & mongoose.Document;

@Schema()
export class Transactions {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Commerce',
  })
  commerce_id: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user_id: string;

  @Prop()
  amount: number;

  @Prop()
  discount: number;

  @Prop({
    type: Date,
    default: Date.now,
  })
  creation: Date;
}

export const TransactionsSchema = SchemaFactory.createForClass(Transactions);
