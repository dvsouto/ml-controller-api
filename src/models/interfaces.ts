import { DataSource, Entity, EntityOptions, EntityTarget, FindOneOptions, FindOptionsWhere, InsertResult, Repository } from "typeorm";

interface IBaseModel {
  entity: EntityTarget<{ (options?: EntityOptions): ClassDecorator; (name?: string, options?: EntityOptions): ClassDecorator; }>;
	dataSource: DataSource;
	repository: Repository<typeof Entity>;

	findAll: () => Promise<typeof Entity[]>;
	findOne: (options: FindOneOptions) => Promise<typeof Entity | null>;
	findOneBy: (where: FindOptionsWhere<typeof Entity> | FindOptionsWhere<typeof Entity>[]) => Promise<typeof Entity | null>;
  insert: (data: object) => Promise<InsertResult>;
	insertOrUpdate: (where: FindOptionsWhere<typeof Entity> | FindOptionsWhere<typeof Entity>[], data: object) => Promise<any>; 
	insertIfNotExists: (where: FindOptionsWhere<typeof Entity> | FindOptionsWhere<typeof Entity>[], data: object) => Promise<any>;

	getRepository: () => Repository<typeof Entity>; 
	//update: (where: FindOptionsWhere<typeof Entity> | FindOptionsWhere<typeof Entity>[], data: object) => Promise<[]>;
}

export {
	IBaseModel
};