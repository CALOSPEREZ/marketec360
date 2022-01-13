import { TransactionsServiceInterface } from '../transactions/interface/transactions.service.interface';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    private readonly transactionservice;
    constructor(authService: AuthService, transactionservice: TransactionsServiceInterface);
    login(req: any): Promise<any>;
    profile(req: any, res: any): Promise<any>;
}
