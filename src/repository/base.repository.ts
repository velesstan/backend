import { Document, Model, FilterQuery, UpdateQuery } from "mongoose";

/**
 * MongoDB Base repository
 */
export abstract class BaseRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(entityFilterQuery: FilterQuery<T>, projection?: Record<string, unknown>): Promise<T | null> {
    return this.entityModel
      .findOne(entityFilterQuery, {
        __id: 0,
        __v: 0,
        ...projection,
      })
      .exec();
  }

  async find(entityFilterQuery: FilterQuery<T>, projection?: Record<string, unknown>): Promise<T[]> {
    return this.entityModel
      .find(entityFilterQuery, {
        __id: 0,
        __v: 0,
        ...projection,
      })
      .exec();
  }

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  async findOneAndUpdate(entityFilterQuery: FilterQuery<T>, updateEntityDate: UpdateQuery<unknown>): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(entityFilterQuery, updateEntityDate, { new: true }).exec();
  }
}
