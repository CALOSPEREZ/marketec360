import { CommerceServiceInterface } from '../commerce/interface/commerce.service.interface';
import { CustomerServiceInterface } from '../customer/interface/customer.service.interface';
import { CreateTransactionsDto } from './dto/create.transactions.dto';
import { TransactionsRepositoryInterface } from './interface/transactions.repository.interface';
import { Transactions } from './schema/Transactions.shema';
export declare class TransactionsService {
    private readonly transactionRepository;
    private readonly commerceService;
    private readonly customerService;
    constructor(transactionRepository: TransactionsRepositoryInterface, commerceService: CommerceServiceInterface, customerService: CustomerServiceInterface);
    findByAllConditionRelation(id: string, relation: any): Promise<Transactions[]>;
    findByConditionRelationAgregate(relation: any): Promise<Transactions[]>;
    discount(comerce_id: string, mount: number, user_id: string): Promise<any>;
    useDiscount(condition: any): Promise<any>;
    filterUser(condition: any): Promise<any>;
    resultAmount(user_id: string, commerce_id: any): Promise<any>;
    commerce(id: string): Promise<any>;
    validate(userDto: CreateTransactionsDto): Promise<Transactions>;
    create(userDto: CreateTransactionsDto): Promise<Transactions>;
}
