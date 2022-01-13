import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
export type CommerceDocument = Commerce & mongoose.Document;

@Schema()
export class Commerce {
  @Prop()
  name: string;

  @Prop()
  province: string;

  @Prop()
  direction: string;

  @Prop({
    unique: true,
  })
  cif: string;
  @Prop()
  maxDiscountAmount: number;

  @Prop()
  discount: number;

  @Prop(
    raw([
      {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        amount: { type: Number },
        maxDiscountAmount: { type: Number },
        status: { type: Boolean },
      },
    ]),
  )
  discounts?: [
    {
      user_id: string;
      maxDiscountAmount: number;
      amount: number;
      status: boolean;
    },
  ];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  manager?: string;
}

export const CommerceSchema = SchemaFactory.createForClass(Commerce);
