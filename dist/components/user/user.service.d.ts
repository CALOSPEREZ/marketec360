import { RoleServiceInterface } from '../role/interface/role.service.interface';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UsereRepositoryInterface } from './interface/user.repository.interface';
import { User } from './schema/user.schema';
export declare class UserService {
    private readonly userRepository;
    private readonly roleService;
    constructor(userRepository: UsereRepositoryInterface, roleService: RoleServiceInterface);
    create(userDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
    update(userDto: UpdateUserDto, id: string): Promise<User>;
    findByCondition(email: string): Promise<User>;
    findByConditionRelation(email: any, relation: string): Promise<User>;
    delete(id: string): Promise<User>;
    findByConditionRelationAgregate(relation: any): Promise<any>;
    commerceList(id: string): Promise<any>;
    commercefindUser(filter: string, commerce_id: string): Promise<any>;
}
