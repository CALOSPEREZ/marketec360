import { BaseInterfaceRepository } from '../../../repositories/base/base.interface.repository';
import { Transactions } from '../schema/Transactions.shema';

export type TransactionsRepositoryInterface =
  BaseInterfaceRepository<Transactions>;
