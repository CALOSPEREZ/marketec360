import { BaseInterfaceRepository } from './base.interface.repository';
import { Model } from 'mongoose';
export declare abstract class BaseAbstractRepository<T> implements BaseInterfaceRepository<T> {
    private entity;
    constructor(entity: Model<T>);
    findByConditionRelationAgregate(relation: any): Promise<T[]>;
    findByConditionRelation(filterCondition: any, relation: string): Promise<T>;
    findByAllConditionRelation(filterCondition: any, relation: string): Promise<T[]>;
    findByAllCondition(filterCondition: any): Promise<T[]>;
    findById(id: string): Promise<T>;
    findByCondition(filterCondition: any): Promise<T>;
    findAll(): Promise<T[]>;
    create(data: T | any): Promise<T>;
    update(data: T, condition: any): Promise<T>;
    delete(id: string): Promise<T>;
    pushInArray(filter: any, data: T): Promise<T>;
}
