import { CreateCommerceDto } from './dto/create.commerce.dto';
import { DiscountDto } from './dto/discount.dto';
import { DiscountUpdateDto } from './dto/discount.updatedto.dto';
import { CommerceServiceInterface } from './interface/commerce.service.interface';
import { Commerce } from './schema/commerce.shema';
export declare class CommerceController {
    private readonly custommerService;
    constructor(custommerService: CommerceServiceInterface);
    create(custommerDto: CreateCommerceDto, res: any): Promise<{
        message: string;
        data: any;
    }>;
    discount(custommerDto: DiscountDto, id: string, res: any): Promise<{
        message: string;
        data: any;
    }>;
    updateDiscount(custommerDto: DiscountUpdateDto, id: string, res: any): Promise<{
        message: string;
        data: any;
    }>;
    deleteDiscount(param: any, res: any): Promise<{
        message: string;
        data: any;
    }>;
    commerce(commerce_id: string, req: any, res: any): Promise<Commerce>;
    findAll(res: any): Promise<Commerce[]>;
    findById(id: string, res: any): Promise<Commerce>;
    update(commercedto: CreateCommerceDto, id: string, res: any): Promise<Commerce>;
    delete(id: string, res: any): Promise<Commerce>;
}
