import { CreateRoleDto } from './dto/createRoleDto';
import { RoleRepositoryInterface } from './interface/role.repository.interface';
import { Role } from './schema/role.schema';
export declare class RoleService {
    private readonly userRepository;
    constructor(userRepository: RoleRepositoryInterface);
    create(userDto: CreateRoleDto): Promise<Role>;
    findAll(): Promise<Role[]>;
    findById(id: string): Promise<Role>;
    update(userDto: CreateRoleDto, id: string): Promise<Role>;
    delete(id: string): Promise<Role>;
    findByCondition(slug: string): Promise<Role>;
}
