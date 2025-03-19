import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { PermissionLevel } from './permission-level.enum';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { GetUserAllDto } from './dto/get-user-all.dto';
import { Permission } from './schemas/permission.schema';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionDecorator } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { UpdateProjectDto } from '../projects/dto/update-project.dto';

@ApiTags('Permission')
@Controller('permissions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @UseGuards(PermissionsGuard)
  @PermissionDecorator(PermissionLevel.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create permission for one user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string', example: '67da32b31ef39760b9524f90' },
        companyId: { type: 'string', example: '89da32b31ef39760b9524f22' },
        level: {
          type: 'string',
          enum: Object.values(PermissionLevel),
          example: PermissionLevel.ADMIN,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Permission successfully created.',
    type: Permission,
    example: {
      userId: '67da32b31ef39760b9524f90',
      companyId: '44da32b31ef39760b9524f32',
      level: 'ADMIN',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Permission is duplicated.',
  })
  async create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @UseGuards(PermissionsGuard)
  @PermissionDecorator(PermissionLevel.ADMIN)
  @Get(':companyId')
  @ApiOperation({ summary: 'Get all users' })
  @ApiParam({
    name: 'companyId',
    type: String,
    description: 'The _id of the company',
    example: '60d0fe4f5311236168a109ca',
  })
  @ApiResponse({
    status: 200,
    description: 'Get all user data successfully.',
    type: GetUserAllDto,
    isArray: true,
  })
  @ApiResponse({
    status: 403,
    description: 'Your permission is not allowed.',
  })
  async getAllUser(@Param('companyId') comapnyId: string) {
    return this.permissionsService.findByCompanyId(comapnyId);
  }

  @UseGuards(PermissionsGuard)
  @PermissionDecorator(PermissionLevel.ADMIN)
  @Put()
  @ApiOperation({ summary: 'Edit permission for one user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string', example: '67da32b31ef39760b9524f90' },
        companyId: { type: 'string', example: '89da32b31ef39760b9524f22' },
        level: {
          type: 'string',
          enum: Object.values(PermissionLevel),
          example: PermissionLevel.ADMIN,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Permission successfully updated.',
    type: Permission,
    example: {
      userId: '67da32b31ef39760b9524f90',
      companyId: '44da32b31ef39760b9524f32',
      level: 'ADMIN',
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Permission not found',
  })
  async update(@Body() updatePermissionData: UpdatePermissionDto) {
    return this.permissionsService.FindByUserIdAndUpdate(
      updatePermissionData.companyId,
      updatePermissionData.userId,
      updatePermissionData.level,
    );
  }

  @UseGuards(PermissionsGuard)
  @PermissionDecorator(PermissionLevel.ADMIN)
  @Delete(':companyId')
  @ApiOperation({ summary: 'Remove permission for one user' })
  @ApiParam({
    name: 'companyId',
    type: String,
    description: 'The _id of the company',
    example: '67da32b31ef39760b9524f86',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string', example: '67da32b31ef39760b9524f92' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Permission successfully removed.',
    type: Permission,
  })
  @ApiResponse({
    status: 404,
    description: 'Permission not found',
  })
  async remove(
    @Param('companyId') companyId: string,
    @Body('userId') userId: string,
  ) {
    return this.permissionsService.FindByUserIdAndRemove(companyId, userId);
  }

  @UseGuards(PermissionsGuard)
  @PermissionDecorator(PermissionLevel.WRITE)
  @Put('project/:companyId')
  @ApiOperation({ summary: 'Update project' })
  @ApiParam({
    name: 'companyId',
    type: String,
    description: 'The _id of the project',
    example: '67da32b31ef39760b9524f84',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Sample' },
        description: { type: 'string', example: 'This is sample project' },
        priority: { type: 'number', example: 4 },
        tags: { type: 'array', example: [] },
        projectId: { type: 'string', example: '67da32b31ef39760b9524f8a' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Project successfully updated',
    type: Permission,
  })
  @ApiResponse({
    status: 403,
    description: 'Permission is not allowed',
  })
  async updateProject(
    @Param('companyId') companyId: string,
    @Body() updateProjectData: UpdateProjectDto,
  ) {
    return this.permissionsService.EditProject(companyId, updateProjectData);
  }

  @UseGuards(PermissionsGuard)
  @PermissionDecorator(PermissionLevel.DELETE)
  @Delete('project/:companyId')
  @ApiOperation({ summary: 'Delete project' })
  @ApiParam({
    name: 'companyId',
    type: String,
    description: 'The _id of the project',
    example: '67da32b31ef39760b9524f84',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        projectId: { type: 'string', example: '67da32b31ef39760b9524f8a' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Project successfully deleted',
    type: Permission,
  })
  @ApiResponse({
    status: 403,
    description: 'Permission is not allowed',
  })
  async removeProject(@Body('projectId') projectId: string) {
    return this.permissionsService.RemoveProject(projectId);
  }
}
