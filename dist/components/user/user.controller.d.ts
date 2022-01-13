import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserServiceInterface } from './interface/user.service.interface';
import { User } from './schema/user.schema';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserServiceInterface);
    findAll(res: any): Promise<User[]>;
    first(id: string, res: any): Promise<any>;
    commerces(req: any, res: any): Promise<any>;
    commercesfindUser(filter: string, req: any, res: any): Promise<any>;
    create(userDto: CreateUserDto, res: any): Promise<{
        message: string;
        data: CreateUserDto;
    }>;
    update(userDto: UpdateUserDto, id: string, res: any): Promise<User>;
    delete(id: string, res: any): Promise<any>;
    login(email: any): Promise<User>;
}
