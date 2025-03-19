import { SetMetadata } from '@nestjs/common';
import { PermissionLevel } from '../permissions/permission-level.enum';

export const PermissionDecorator = (...permissions: PermissionLevel[]) => SetMetadata('permissions', permissions);