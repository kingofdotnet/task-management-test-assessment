import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const createdProject = new this.projectModel(createProjectDto);
    return createdProject.save();
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  async update(companyId: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    (updateProjectDto as any).companyId = companyId;
    const projectId = updateProjectDto.projectId;
    delete updateProjectDto.projectId;

    const updatedProject = await this.projectModel.findByIdAndUpdate(projectId, updateProjectDto, { new: true }).exec();
    if (!updatedProject) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
    return updatedProject;
  }

  async remove(id: string): Promise<Project> {
    const deletedProject = await this.projectModel.findByIdAndDelete(id).exec();
    if (!deletedProject) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return deletedProject;
  }

  async clear() {
    await this.projectModel.deleteMany({}).exec();
  }
}