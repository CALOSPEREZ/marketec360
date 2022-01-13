import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerRepository } from 'src/repositories/customer.repository';
import { UserModule } from '../user/user.module';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Customer, CustomerSchema } from './schema/customer.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
    UserModule,
  ],
  providers: [
    {
      provide: 'customerRepositoryInterface',
      useClass: CustomerRepository,
    },
    {
      provide: 'customerServiceInterface',
      useClass: CustomerService,
    },
  ],
  controllers: [CustomerController],
  exports: [{ provide: 'customerServiceInterface', useClass: CustomerService }],
})
export class CustomerModule {}
