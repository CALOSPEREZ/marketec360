import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './components/auth/auth.module';
import { CustomerModule } from './components/customer/customer.module';
import { RoleModule } from './components/role/role.module';
import { UserModule } from './components/user/user.module';
import { Mongo } from './config/mongodb/mongo.module';
import { CommerceModule } from './components/commerce/commerce.module';
import { TransactionsModule } from './components/transactions/transactions.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
    }),
    Mongo,
    RoleModule,
    UserModule,
    AuthModule,
    CustomerModule,
    CommerceModule,
    TransactionsModule,
  ],
})
export class AppModule {}
