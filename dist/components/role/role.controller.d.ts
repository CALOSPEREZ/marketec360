import { CreateRoleDto } from './dto/createRoleDto';
import { RoleServiceInterface } from './interface/role.service.interface';
import { Role } from './schema/role.schema';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleServiceInterface);
    findAll(): Promise<Role[]>;
    first(id: string, res: any): Promise<any>;
    create(roleDto: CreateRoleDto, res: any): Promise<{
        message: string;
        data: CreateRoleDto;
    }>;
    update(roleDto: CreateRoleDto, id: string): Promise<Role>;
    delete(id: string): Promise<Role>;
    findSlug(slug: string): Promise<Role>;
}
