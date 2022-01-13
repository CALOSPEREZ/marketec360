import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Injectable } from '@nestjs/common';
import { Role } from 'src/components/role/schema/role.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from 'src/components/customer/schema/customer.shema';
import { CustomerRepositoryInterface } from 'src/components/customer/interface/customer.repository.interface';

@Injectable()
export class CustomerRepository
  extends BaseAbstractRepository<Customer>
  implements CustomerRepositoryInterface
{
  constructor(
    @InjectModel(Customer.name)
    private readonly customerRepository: Model<Customer>,
  ) {
    super(customerRepository);
  }
}
