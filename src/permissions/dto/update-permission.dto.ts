import { IsNotEmpty, IsEnum } from 'class-validator';
import { PermissionLevel } from '../permission-level.enum'; // Adjust the path as necessary

export class UpdatePermissionDto {
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    companyId: string;

    @IsNotEmpty()
    @IsEnum(PermissionLevel)
    level: PermissionLevel;
}