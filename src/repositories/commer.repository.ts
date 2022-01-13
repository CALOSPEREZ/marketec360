import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Commerce } from 'src/components/commerce/schema/commerce.shema';
import { CommerceRepositoryInterface } from 'src/components/commerce/interface/commerce.repository.interface';

@Injectable()
export class CommerceRepository
  extends BaseAbstractRepository<Commerce>
  implements CommerceRepositoryInterface
{
  constructor(
    @InjectModel(Commerce.name)
    private readonly commerceRepository: Model<Commerce>,
  ) {
    super(commerceRepository);
  }
}
