import { BaseInterfaceRepository } from '../../../repositories/base/base.interface.repository';
import { Customer } from '../schema/customer.shema';

export type CustomerRepositoryInterface = BaseInterfaceRepository<Customer>;
