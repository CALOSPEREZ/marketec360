import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserServiceInterface } from 'src/components/user/interface/user.service.interface';
export declare class UserIdMiddleware implements NestMiddleware {
    private readonly userService;
    constructor(userService: UserServiceInterface);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
