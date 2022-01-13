import { Commerce } from 'src/components/commerce/schema/commerce.shema';
import { Customer } from 'src/components/customer/schema/customer.shema';
import { CreateTransactionsDto } from '../dto/create.transactions.dto';
import { Transactions } from '../schema/Transactions.shema';

export interface TransactionsServiceInterface {
  create(UserDto: any): Promise<Transactions>;

  findAll(): Promise<Transactions[]>;

  findById(id: string): Promise<Transactions>;

  update(data: Transactions, condition: any): Promise<Transactions>;

  findByCondition(filterCondition: any): Promise<Transactions>;

  findByConditionRelation(
    filterCondition: any,
    relation: string,
  ): Promise<Transactions>;

  findByConditionRelationAgregate(relation: any): Promise<Transactions[]>;
  filterUser(condition: any): Promise<Customer>;
  useDiscount(condition: any): Promise<Commerce[]>;
  profile(id: string, tipe: number): Promise<any>;
  resultAmount(user_id: string, commerce_id: string): Promise<any>;
  findByAllConditionRelation(
    id: string,
    relation: any,
  ): Promise<Transactions[]>;

  delete(id: string): Promise<Transactions>;
  commerce(id: string): Promise<any>;
  validate(userDto: CreateTransactionsDto): Promise<Transactions>;
}
