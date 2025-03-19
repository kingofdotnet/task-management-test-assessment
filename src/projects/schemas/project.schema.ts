import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  status: string;

  @Prop()
  priority: number;

  @Prop([String])
  tags: string[];

  @Prop({ required: true })
  companyId: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);