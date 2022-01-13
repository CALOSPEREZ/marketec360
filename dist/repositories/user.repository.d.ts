import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Model } from 'mongoose';
import { User } from 'src/components/user/schema/user.schema';
import { UsereRepositoryInterface } from 'src/components/user/interface/user.repository.interface';
export declare class UserRepository extends BaseAbstractRepository<User> implements UsereRepositoryInterface {
    private readonly userRepository;
    constructor(userRepository: Model<User>);
}
