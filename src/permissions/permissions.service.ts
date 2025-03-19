import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission, PermissionDocument } from './schemas/permission.schema';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

import { GetUserAllDto } from './dto/get-user-all.dto';
import { PermissionLevel } from './permission-level.enum';
import { UpdateProjectDto } from '../projects/dto/update-project.dto';
import { ProjectsService } from '../projects/projects.service';
import { Project } from '../projects/schemas/project.schema';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name) private permissionModel: Model<PermissionDocument>,
    private projectService: ProjectsService
  ) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {

    const oldPermission = await this.permissionModel.findOne({ companyId: createPermissionDto.companyId, userId: createPermissionDto.userId });

    if (oldPermission) {
      throw new BadRequestException(`Permission for this company is already created.`);
    }

    const createdPermission = new this.permissionModel(createPermissionDto);
    return createdPermission.save();
  }

  async findByCompanyId(companyId: string): Promise<GetUserAllDto[]> {
    const userAllData: GetUserAllDto[] = await this.permissionModel.aggregate([
      {
        $match: { companyId },
      },
      {
        $addFields: {
          userIdObject: { $toObjectId: '$userId' }, // Convert userId to ObjectId
        },
      },
      {
        $lookup: {
          from: 'users', // The name of the users collection
          localField: 'userIdObject',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $unwind: '$userDetails', // Deconstructs the array field to output one document for each element
      },
      {
        $addFields: {
          userName: '$userDetails.name',
          userEmail: '$userDetails.email',
        },
      },
      {
        $project: {
          userDetails: 0,
        },
      },
    ]).exec();
    
    return userAllData;
  }

  async FindByUserIdAndUpdate(companyId: string, userId: string, level: PermissionLevel): Promise<Permission> {
    const updatedPermission = await this.permissionModel.findOneAndUpdate({ userId, companyId }, { level }, { new: true }).exec();
    if (!updatedPermission) {
      throw new NotFoundException(`Permission for userId ${userId} not found`);
    }
    return updatedPermission;
  }

  async FindByUserIdAndRemove(companyId: string, userId: string): Promise<Permission> {
    const removedPermission = await this.permissionModel.findOneAndDelete({ userId, companyId }).exec();
    if (!removedPermission) {
      throw new NotFoundException(`Permission for userId ${userId} not found`);
    }
    return removedPermission;
  }

  async EditProject(companyId: string, updatedProjectDto: UpdateProjectDto) {
    const updatedProject = await this.projectService.update(companyId, updatedProjectDto);

    return updatedProject;
  }

  async RemoveProject(projectId: string): Promise<Project> {
    const deletedProject = await this.projectService.remove(projectId);

    return deletedProject;
  }

  async getPermissionFromGuard(companyId: string, userId: string) {
    return await this.permissionModel.findOne({
      companyId,
      userId
    });
  }

  async clear() {
    await this.permissionModel.deleteMany({}).exec();
  }
}