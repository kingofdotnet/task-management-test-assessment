import { IsArray, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ProjectStatusLevel } from '../projects-status.enum';

export class UpdateProjectDto {
  @IsOptional()
  name: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(ProjectStatusLevel)
  status: string;

  @IsOptional()
  priority?: number;

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsOptional()
  projectId?: string;
}