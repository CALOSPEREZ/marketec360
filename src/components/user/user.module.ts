import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from 'src/repositories/user.repository';
import { RoleModule } from '../role/role.module';
import { User, UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RoleModule,
  ],
  providers: [
    {
      provide: 'userRepositoryInterface',
      useClass: UserRepository,
    },
    {
      provide: 'userServiceInterface',
      useClass: UserService,
    },
  ],
  controllers: [UserController],
  exports: [{ provide: 'userServiceInterface', useClass: UserService }],
})
export class UserModule {}
