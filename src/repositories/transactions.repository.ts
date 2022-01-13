import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Transactions } from 'src/components/transactions/schema/Transactions.shema';
import { TransactionsRepositoryInterface } from 'src/components/transactions/interface/transactions.repository.interface';

@Injectable()
export class TransactionsRepository
  extends BaseAbstractRepository<Transactions>
  implements TransactionsRepositoryInterface
{
  constructor(
    @InjectModel(Transactions.name)
    private readonly transactionsRepository: Model<Transactions>,
  ) {
    super(transactionsRepository);
  }
}
