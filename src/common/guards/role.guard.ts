import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userRole = request['role'];

    const requiredRole = this.getRequiredRoleFromHandler(context);
    return userRole === requiredRole;
  }

  private getRequiredRoleFromHandler(context: ExecutionContext): string {
    const handler = context.getHandler();
    return Reflect.getMetadata('role', handler);
  }
}
