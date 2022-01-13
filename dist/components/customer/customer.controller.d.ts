import { CreateCustomerDto } from './dto/create.customer.dto';
import { CustomerServiceInterface } from './interface/customer.service.interface';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerServiceInterface);
    create(dataDto: CreateCustomerDto, res: any): Promise<{
        message: string;
        data: CreateCustomerDto;
    }>;
}
