import { IsNotEmpty, IsEnum, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PermissionLevel } from '../permission-level.enum'; // Adjust the path if necessary

export class GetUserAllDto {
  @ApiProperty({ example: '67da32b31ef39760b9524f90', description: 'The unique ID of the user' })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: '60d0fe4f5311236168a109ca', description: 'The unique ID of the company' })
  @IsNotEmpty()
  companyId: string;

  @ApiProperty({ enum: PermissionLevel, example: PermissionLevel.READ, description: 'The permission level assigned' })
  @IsNotEmpty()
  @IsEnum(PermissionLevel)
  level: PermissionLevel;

  @ApiProperty({ example: 'John Doe', description: 'The full name of the user' })
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ example: 'user@example.com', description: 'The email address of the user' })
  @IsNotEmpty()
  @IsEmail()
  userEmail: string;
}
