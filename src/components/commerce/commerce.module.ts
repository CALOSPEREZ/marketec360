import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommerceRepository } from 'src/repositories/commer.repository';
import { CommerceController } from './commerce.controller';
import { CommerceService } from './commerce.service';
import { CommerceSchema } from './schema/commerce.shema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Commerce', schema: CommerceSchema }]),
  ],
  providers: [
    {
      provide: 'CommerceRepositoryInterface',
      useClass: CommerceRepository,
    },
    {
      provide: 'commerceServiceInterface',
      useClass: CommerceService,
    },
  ],
  controllers: [CommerceController],
  exports: [{ provide: 'commerceServiceInterface', useClass: CommerceService }],
})
export class CommerceModule {}
