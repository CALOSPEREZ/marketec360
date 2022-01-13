export interface BaseInterfaceRepository<T> {
  create(data: T | any): Promise<T>;

  findAll(): Promise<T[]>;

  findByCondition(filterCondition: any): Promise<T>;

  findByConditionRelation(filterCondition: any, relation: string): Promise<T>;

  findById(id: string): Promise<T>;

  update(data: T, condition: any): Promise<T>;

  delete(id: string): Promise<T>;

  pushInArray(filter: any, data: any): Promise<T>;

  findByAllCondition(filterCondition: any): Promise<T[]>;

  findByConditionRelationAgregate(relation: any): Promise<T[]>;
  findByAllConditionRelation(
    filterCondition: any,
    relation: string,
  ): Promise<T[]>;
}
