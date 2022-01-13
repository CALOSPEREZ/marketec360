import { Strategy } from 'passport-local';
import { User } from '../user/schema/user.schema';
import { AuthService } from './auth.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private _authService;
    constructor(_authService: AuthService);
    validate(email: string, password: string): Promise<User>;
}
export {};
