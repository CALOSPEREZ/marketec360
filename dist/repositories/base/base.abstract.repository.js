"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAbstractRepository = void 0;
class BaseAbstractRepository {
    constructor(entity) {
        this.entity = entity;
    }
    async findByConditionRelationAgregate(relation) {
        return await this.entity.aggregate(relation);
    }
    async findByConditionRelation(filterCondition, relation) {
        return await this.entity.findOne(filterCondition).populate(relation).lean();
    }
    async findByAllConditionRelation(filterCondition, relation) {
        return await this.entity.find(filterCondition).populate(relation).lean();
    }
    async findByAllCondition(filterCondition) {
        return await this.entity.find(filterCondition);
    }
    async findById(id) {
        return await this.entity.findById(id);
    }
    async findByCondition(filterCondition) {
        return await this.entity.findOne(filterCondition).lean();
    }
    async findAll() {
        return await this.entity.find();
    }
    async create(data) {
        return await this.entity.create(data);
    }
    async update(data, condition) {
        await this.entity.updateOne(condition, data, { new: true });
        return await this.findById(condition['_id']);
    }
    async delete(id) {
        return await this.entity.findByIdAndDelete(id);
    }
    async pushInArray(filter, data) {
        return await this.entity.findOneAndUpdate(filter, data, { new: true });
    }
}
exports.BaseAbstractRepository = BaseAbstractRepository;
//# sourceMappingURL=base.abstract.repository.js.map