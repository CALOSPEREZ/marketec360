import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/components/user/schema/user.schema';
import { UsereRepositoryInterface } from 'src/components/user/interface/user.repository.interface';

@Injectable()
export class UserRepository
  extends BaseAbstractRepository<User>
  implements UsereRepositoryInterface
{
  constructor(
    @InjectModel(User.name) private readonly userRepository: Model<User>,
  ) {
    super(userRepository);
  }
}
