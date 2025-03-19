import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionLevel } from '../../permissions/permission-level.enum';
import { PermissionsService } from '../../permissions/permissions.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector, private permissionService: PermissionsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<PermissionLevel[]>('permissions', context.getHandler());
    if (!requiredPermissions) {
      return true; // If no permissions are required, allow access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const companyId = request.params.companyId;
    const userId = user.userId;

    const userPermission = await this.permissionService.getPermissionFromGuard(companyId, userId);

    let hasPermission = false;
    if (userPermission?.level) {
        hasPermission = requiredPermissions.includes(userPermission.level);
    }

    if (!hasPermission) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    return hasPermission;
  }
}