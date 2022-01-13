import { CreateCustomerDto } from '../dto/create.customer.dto';
import { Customer } from '../schema/customer.shema';

export interface CustomerServiceInterface {
  create(CustomerDto: CreateCustomerDto): Promise<Customer>;

  findAll(): Promise<Customer[]>;

  findById(id: string): Promise<Customer>;

  update(data: Customer, condition: any): Promise<Customer>;

  delete(id: string): Promise<Customer>;

  findByCondition(filterCondition: any): Promise<Customer>;

  findByConditionRelation(
    filterCondition: any,
    relation: string,
  ): Promise<Customer>;
}
