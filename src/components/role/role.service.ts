import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/createRoleDto';
import { RoleRepositoryInterface } from './interface/role.repository.interface';
import { Role } from './schema/role.schema';
@Injectable()
export class RoleService {
  constructor(
    @Inject('roleRepositoryInterface')
    private readonly userRepository: RoleRepositoryInterface,
  ) {}
  public async create(userDto: CreateRoleDto): Promise<Role> {
    const { slug, value } = userDto;
    return await this.userRepository.create({ slug, value });
  }
  public async findAll(): Promise<Role[]> {
    return await this.userRepository.findAll();
  }
  public async findById(id: string): Promise<Role> {
    return await this.userRepository.findById(id);
  }
  public async update(userDto: CreateRoleDto, id: string): Promise<Role> {
    const { slug, value } = userDto;
    return await this.userRepository.update({ slug, value }, { _id: id });
  }
  public async delete(id: string): Promise<Role> {
    return await this.userRepository.delete(id);
  }

  public async findByCondition(slug: string): Promise<Role> {
    return await this.userRepository.findByCondition({ slug: slug });
  }
}
