import { CreateTransactionsDto } from './dto/create.transactions.dto';
import { TransactionsServiceInterface } from './interface/transactions.service.interface';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsServiceInterface);
    create(userDto: CreateTransactionsDto, res: any, req: any): Promise<{
        message: string;
        data: CreateTransactionsDto;
    }>;
    findpopulateuser(res: any, req: any): Promise<{
        message: string;
        data: CreateTransactionsDto;
    }>;
    findByConditionRelationAgregate(res: any, req: any, id: string): Promise<{
        message: string;
        data: CreateTransactionsDto;
    }>;
    listDisconunt(res: any, req: any, id: string): Promise<{
        message: string;
        data: CreateTransactionsDto;
    }>;
    discount(res: any, req: any, { commerce_id, dni }: {
        commerce_id: any;
        dni: any;
    }): Promise<{
        message: string;
        data: any;
    }>;
}
