import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Role } from 'src/components/role/schema/role.schema';
import { RoleRepositoryInterface } from 'src/components/role/interface/role.repository.interface';
import { Model } from 'mongoose';
export declare class RoleRepository extends BaseAbstractRepository<Role> implements RoleRepositoryInterface {
    private readonly roleRepository;
    constructor(roleRepository: Model<Role>);
}
