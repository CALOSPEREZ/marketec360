import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleRepository } from 'src/repositories/role.repository';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleSchema } from './schema/role.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }])],
  providers: [
    {
      provide: 'roleRepositoryInterface',
      useClass: RoleRepository,
    },
    {
      provide: 'roleServiceInterface',
      useClass: RoleService,
    },
  ],
  controllers: [RoleController],
  exports: [
    {
      provide: 'roleServiceInterface',
      useClass: RoleService,
    },
  ],
})
export class RoleModule {}
