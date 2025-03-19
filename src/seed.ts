import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { CompaniesService } from './companies/companies.service';
import { ProjectsService } from './projects/projects.service';
import { PermissionsService } from './permissions/permissions.service';
import { CreateProjectDto } from './projects/dto/create-project.dto';
import { CreatePermissionDto } from './permissions/dto/create-permission.dto';
import * as bcrypt from 'bcrypt';
import { PermissionLevel } from './permissions/permission-level.enum';
import { CreateCompanyDto } from './companies/dto/create-company.dto';
import { ProjectStatusLevel } from './projects/projects-status.enum';
import { CreateUserDto } from './users/dto/create-user.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const usersService = app.get(UsersService);
  const companiesService = app.get(CompaniesService);
  const projectsService = app.get(ProjectsService);
  const permissionsService = app.get(PermissionsService);

  await usersService.clear();
  await companiesService.clear();
  await projectsService.clear();
  await permissionsService.clear()

  // Seed Companies
  const companies: CreateCompanyDto[] = [
    { name: 'Tech Corp', industry: 'Technology' },
    { name: 'Health Inc', industry: 'Healthcare' },
  ];
  let createdCompanies: any[] = [];
  for (const company of companies) {
    const createdCompany = await companiesService.create(company);
    createdCompanies.push(createdCompany);
  }

  // Seed Projects
  const projects: CreateProjectDto[] = [
    { name: 'Project1', status: ProjectStatusLevel.ACTIVE, description: 'ASP.NET full stack', companyId: createdCompanies[0]._id },
    { name: 'Project2', status: ProjectStatusLevel.ARCHIVED, description: 'Blazor full stack', companyId: createdCompanies[0]._id },
    { name: 'Project3', status: ProjectStatusLevel.ARCHIVED, description: 'Node.js full stack', companyId: createdCompanies[1]._id },
    { name: 'Project4', status: ProjectStatusLevel.DRAFT, description: 'Next.js full stack', companyId: createdCompanies[1]._id },
  ];
  for (const project of projects) {
    await projectsService.create(project);
  }

  // Seed Users
  const users: CreateUserDto[] = [
    { name: 'Alice', email: 'alice@example.com', password: 'password123' },
    { name: 'Bob', email: 'bob@example.com', password: 'password123' },
  ];

  const createdUsers: any[] = [];
  for (const user of users) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const createdUser = await usersService.create(user);
    createdUsers.push(createdUser);
  }  

  // Seed Permissions
  const permissions: CreatePermissionDto[] = [
    { userId: createdUsers[0]._id, companyId: createdCompanies[0]._id, level: PermissionLevel.ADMIN },
    { userId: createdUsers[0]._id, companyId: createdCompanies[1]._id, level: PermissionLevel.DELETE },
    { userId: createdUsers[1]._id, companyId: createdCompanies[0]._id, level: PermissionLevel.READ },
    { userId: createdUsers[1]._id, companyId: createdCompanies[1]._id, level: PermissionLevel.WRITE },
  ];
  for (const permission of permissions) {
    await permissionsService.create(permission);
  }

  await app.close();
}

bootstrap();