import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Model } from 'mongoose';
import { Commerce } from 'src/components/commerce/schema/commerce.shema';
import { CommerceRepositoryInterface } from 'src/components/commerce/interface/commerce.repository.interface';
export declare class CommerceRepository extends BaseAbstractRepository<Commerce> implements CommerceRepositoryInterface {
    private readonly commerceRepository;
    constructor(commerceRepository: Model<Commerce>);
}
