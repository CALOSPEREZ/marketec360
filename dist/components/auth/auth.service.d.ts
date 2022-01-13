import { JwtService } from '@nestjs/jwt';
import { UserServiceInterface } from '../user/interface/user.service.interface';
import { User } from '../user/schema/user.schema';
import { AuthDto } from './dto/auth.dto';
export declare class AuthService {
    private readonly userService;
    private jwtService;
    constructor(userService: UserServiceInterface, jwtService: JwtService);
    autentification(data: AuthDto): Promise<User | null>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    porfileUser(id: any): Promise<User[]>;
    porfileCommerce(id: any): Promise<User[]>;
}
