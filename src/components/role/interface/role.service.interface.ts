import { CreateRoleDto } from '../dto/createRoleDto';
import { Role } from '../schema/role.schema';

export interface RoleServiceInterface {
  create(roleDto: CreateRoleDto): Promise<Role>;

  findAll(): Promise<Role[]>;

  findById(id: string): Promise<Role>;

  update(data: Role, condition: any): Promise<Role>;

  delete(id: string): Promise<Role>;

  findByCondition(filterCondition: any): Promise<Role>;

  findByConditionRelation(
    filterCondition: any,
    relation: string,
  ): Promise<Role>;
}
