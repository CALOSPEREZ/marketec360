import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsRepository } from 'src/repositories/transactions.repository';
import { CommerceModule } from '../commerce/commerce.module';
import { CustomerModule } from '../customer/customer.module';
import { Transactions, TransactionsSchema } from './schema/Transactions.shema';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transactions.name, schema: TransactionsSchema },
    ]),
    CommerceModule,
    CustomerModule,
  ],
  providers: [
    {
      provide: 'transactionsRepositoryInterface',
      useClass: TransactionsRepository,
    },
    {
      provide: 'transactionsServiceInterface',
      useClass: TransactionsService,
    },
  ],
  controllers: [TransactionsController],
  exports: [
    { provide: 'transactionsServiceInterface', useClass: TransactionsService },
  ],
})
export class TransactionsModule {}
