import { DataSource, Entity, EntityOptions, EntityTarget, InsertResult, Repository } from "typeorm";

interface IBaseModel {
  entity: EntityTarget<{ (options?: EntityOptions): ClassDecorator; (name?: string, options?: EntityOptions): ClassDecorator; }>;
	dataSource: DataSource;
	repository: Repository<typeof Entity>;

  insert: (data: object) => Promise<InsertResult>;
}

export {
	IBaseModel
};