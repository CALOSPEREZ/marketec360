import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @Prop()
  slug: string;

  @Prop()
  value: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
