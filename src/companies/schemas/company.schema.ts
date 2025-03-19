import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CompanyDocument = Company & Document;

@Schema()
export class Company extends Document {
  @ApiProperty({ example: 'TechCorp', description: 'The name of the company' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    example: 'Software Development',
    description: 'The industry the company operates in',
  })
  @Prop()
  industry: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
