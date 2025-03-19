import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { PermissionLevel } from '../permission-level.enum';

export type PermissionDocument = Permission & Document;

@Schema()
export class Permission extends Document {
  @ApiProperty({ example: '67da32b31ef39760b9524f90', description: 'The unique ID of the user' })
  @Prop({ required: true })
  userId: string;

  @ApiProperty({ example: '66da32b31ef39760b9524f32', description: 'The unique ID of the company' })
  @Prop({ required: true })
  companyId: string;

  @ApiProperty({ enum: PermissionLevel, example: PermissionLevel.READ, description: 'The permission level assigned' })
  @Prop({ required: true, enum: PermissionLevel })
  level: PermissionLevel;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
