import { Inject, Injectable } from '@nestjs/common';
import { UserServiceInterface } from '../user/interface/user.service.interface';
import { CreateCustomerDto } from './dto/create.customer.dto';
import { CustomerRepositoryInterface } from './interface/customer.repository.interface';
import { Customer } from './schema/customer.shema';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('userServiceInterface')
    private readonly userService: UserServiceInterface,
    @Inject('customerRepositoryInterface')
    private readonly customerRepository: CustomerRepositoryInterface,
  ) {}
  public async create(data: CreateCustomerDto): Promise<Customer> {
    const user = await this.userService.create(data.user);
    const { dni, province, direction, dateOfBirth } = data;
    const user_id = user['_id'].toString();
    return await this.customerRepository.create({
      dni,
      province,
      dateOfBirth,
      direction,
      user_id,
    });
  }
  public async findByCondition(filterCondition: string): Promise<Customer> {
    return await this.customerRepository.findByCondition(filterCondition);
  }
}
