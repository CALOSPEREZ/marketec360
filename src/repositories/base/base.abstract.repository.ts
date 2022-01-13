import { BaseInterfaceRepository } from './base.interface.repository';
import { Model } from 'mongoose';
export abstract class BaseAbstractRepository<T>
  implements BaseInterfaceRepository<T>
{
  private entity: Model<T>;
  constructor(entity: Model<T>) {
    this.entity = entity;
  }
  public async findByConditionRelationAgregate(relation: any): Promise<T[]> {
    return await this.entity.aggregate(relation);
  }
  public async findByConditionRelation(
    filterCondition: any,
    relation: string,
  ): Promise<T> {
    return await this.entity.findOne(filterCondition).populate(relation).lean();
  }

  public async findByAllConditionRelation(
    filterCondition: any,
    relation: string,
  ): Promise<T[]> {
    return await this.entity.find(filterCondition).populate(relation).lean();
  }
  public async findByAllCondition(filterCondition: any): Promise<T[]> {
    return await this.entity.find(filterCondition);
  }
  async findById(id: string): Promise<T> {
    return await this.entity.findById(id);
  }

  public async findByCondition(filterCondition: any): Promise<T> {
    return await this.entity.findOne(filterCondition).lean();
  }
  async findAll(): Promise<T[]> {
    return await this.entity.find();
  }

  public async create(data: T | any): Promise<T> {
    return await this.entity.create(data);
  }
  async update(data: T, condition: any): Promise<T> {
    await this.entity.updateOne(condition, data, { new: true });
    return await this.findById(condition['_id']);
  }
  async delete(id: string): Promise<T> {
    return await this.entity.findByIdAndDelete(id);
  }
  async pushInArray(filter: any, data: T): Promise<T> {
    return await this.entity.findOneAndUpdate(filter, data, { new: true });
  }
}
