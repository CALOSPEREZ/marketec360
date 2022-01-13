import { UserServiceInterface } from '../user/interface/user.service.interface';
import { CreateCustomerDto } from './dto/create.customer.dto';
import { CustomerRepositoryInterface } from './interface/customer.repository.interface';
import { Customer } from './schema/customer.shema';
export declare class CustomerService {
    private readonly userService;
    private readonly customerRepository;
    constructor(userService: UserServiceInterface, customerRepository: CustomerRepositoryInterface);
    create(data: CreateCustomerDto): Promise<Customer>;
    findByCondition(filterCondition: string): Promise<Customer>;
}
