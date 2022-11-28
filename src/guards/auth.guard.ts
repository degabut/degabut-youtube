import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { FastifyRequest } from "fastify";

import { JwtAuthProvider } from "./jwt-auth.provider";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtAuthProvider: JwtAuthProvider) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest<FastifyRequest>();

    req.headers.authorization = req.headers.authorization || "";
    const token = req.headers.authorization.split(" ")[1];

    if (!token) throw new UnauthorizedException();

    try {
      this.jwtAuthProvider.verify(token);
      return true;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
