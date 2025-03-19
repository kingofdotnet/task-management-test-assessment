import { IsNotEmpty, IsOptional, IsEnum, IsArray } from 'class-validator';
import { ProjectStatusLevel } from '../projects-status.enum';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsEnum(ProjectStatusLevel)
  status: string;

  @IsOptional()
  priority?: number;

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsNotEmpty()
  companyId: string;
}