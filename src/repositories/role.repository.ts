import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Injectable } from '@nestjs/common';
import { Role } from 'src/components/role/schema/role.schema';
import { RoleRepositoryInterface } from 'src/components/role/interface/role.repository.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RoleRepository
  extends BaseAbstractRepository<Role>
  implements RoleRepositoryInterface
{
  constructor(
    @InjectModel(Role.name) private readonly roleRepository: Model<Role>,
  ) {
    super(roleRepository);
  }
}
