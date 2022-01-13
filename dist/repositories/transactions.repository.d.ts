import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Model } from 'mongoose';
import { Transactions } from 'src/components/transactions/schema/Transactions.shema';
import { TransactionsRepositoryInterface } from 'src/components/transactions/interface/transactions.repository.interface';
export declare class TransactionsRepository extends BaseAbstractRepository<Transactions> implements TransactionsRepositoryInterface {
    private readonly transactionsRepository;
    constructor(transactionsRepository: Model<Transactions>);
}
