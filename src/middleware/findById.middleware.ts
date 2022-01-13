import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserServiceInterface } from 'src/components/user/interface/user.service.interface';

@Injectable()
export class UserIdMiddleware implements NestMiddleware {
  constructor(
    @Inject('userServiceInterface')
    private readonly userService: UserServiceInterface,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const result = await this.userService.findById(req.body.user_id);
    next();
  }
}
