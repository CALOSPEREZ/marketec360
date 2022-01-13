import { CreateUserDto } from '../dto/create.user.dto';
import { User } from '../schema/user.schema';
export interface UserServiceInterface {
    create(UserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
    update(data: User, condition: any): Promise<User>;
    findByCondition(filterCondition: any): Promise<User>;
    findByConditionRelation(filterCondition: any, relation: string): Promise<User>;
    commerceList(id: string): Promise<any>;
    findByConditionRelationAgregate(relation: any): Promise<User[]>;
    commercefindUser(filter: string, commerce_id: string): Promise<any>;
    delete(id: string): Promise<User>;
}
