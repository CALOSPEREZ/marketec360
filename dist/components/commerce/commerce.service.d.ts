import { CreateCommerceDto } from './dto/create.commerce.dto';
import { DiscountDto } from './dto/discount.dto';
import { DiscountUpdateDto } from './dto/discount.updatedto.dto';
import { CommerceRepositoryInterface } from './interface/commerce.repository.interface';
import { Commerce } from './schema/commerce.shema';
export declare class CommerceService {
    private readonly commerceRepository;
    constructor(commerceRepository: CommerceRepositoryInterface);
    create(userDto: any): Promise<Commerce>;
    findAll(): Promise<Commerce[]>;
    findById(id: string): Promise<Commerce>;
    update(userDto: CreateCommerceDto, id: any): Promise<Commerce>;
    delete(id: string): Promise<Commerce>;
    findByCondition(slug: string): Promise<Commerce>;
    findByConditionRelationAgregate(relation: any): Promise<Commerce[]>;
    discount(data: DiscountDto, id: any): Promise<any>;
    updateDiscount(id: string, data: DiscountUpdateDto): Promise<Commerce>;
    deleteDiscount(id: string, comId: string): Promise<Commerce>;
    findByConditionCommerce(findByAllCondition: any): Promise<Commerce>;
    statistics(user_id: string, commerce_id: string): Promise<any>;
}
