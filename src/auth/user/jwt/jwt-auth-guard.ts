import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ROLES_KEY } from '../roles/roles.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const canActivate = await super.canActivate(context);

    if (!canActivate) false;

    const rolesOfRoutes = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!rolesOfRoutes) true;

    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Sem TOKEN!!!');
    }

    const payload = this.jwtService.verify(token);
    const rolesOfUser = payload.role || [];
    const hasRole = () =>
      rolesOfRoutes.some((role) => rolesOfUser.includes(role));

    if (!hasRole()) {
      throw new UnauthorizedException('Usuário sem permissão!');
    }

    return true;
  }
}
