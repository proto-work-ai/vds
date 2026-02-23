import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { JwtPayload } from '../auth/jwt-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return true;
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException(
        'You do not have permissions to do this action'
      );
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid Token');
    }

    try {
      const decoded: JwtPayload = await this.authService.verifyToken(token);
      request.user = decoded;

      const dbUser = await this.userService.getById(decoded.id);
      if (dbUser) {
        const userWithRoles = await this.userService.getUserWithRoles(
          decoded.id
        );

        const isAdmin = userWithRoles.roles.some((role) => role.id === '1');
        return isAdmin;
      } else {
        throw new ForbiddenException('User not found');
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
