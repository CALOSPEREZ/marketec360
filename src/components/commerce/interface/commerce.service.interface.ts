import { CreateCommerceDto } from '../dto/create.commerce.dto';
import { DiscountDto } from '../dto/discount.dto';
import { Commerce } from '../schema/commerce.shema';

export interface CommerceServiceInterface {
  create(roleDto: CreateCommerceDto): Promise<Commerce>;

  findAll(): Promise<Commerce[]>;

  findById(id: string): Promise<Commerce>;

  update(data: Commerce, condition: any): Promise<Commerce>;

  delete(id: string): Promise<Commerce>;

  findByCondition(filterCondition: any): Promise<Commerce>;
  findByConditionCommerce(filterCondition: any): Promise<Commerce>;
  discount(data: DiscountDto, id: string): Promise<Commerce>;

  findByConditionRelation(
    filterCondition: any,
    relation: string,
  ): Promise<Commerce>;

  pushInArray(id: any, data: any): Promise<Commerce>;

  updateDiscount(id: string, data: any): Promise<Commerce>;

  deleteDiscount(id: string, comId: string): Promise<Commerce>;
  findByAllCondition(filterCondition: any): Promise<Commerce[]>;
  findByConditionRelationAgregate(relation: any): Promise<Commerce[]>;
  statistics(user_id: string, commerce_id: string): Promise<any>;
}
