import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Model } from 'mongoose';
import { Customer } from 'src/components/customer/schema/customer.shema';
import { CustomerRepositoryInterface } from 'src/components/customer/interface/customer.repository.interface';
export declare class CustomerRepository extends BaseAbstractRepository<Customer> implements CustomerRepositoryInterface {
    private readonly customerRepository;
    constructor(customerRepository: Model<Customer>);
}
