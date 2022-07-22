import { DataSource, Entity, EntityOptions, EntityTarget, InsertResult, Repository } from "typeorm"; 
import { AppDataSource } from "@src/data-source";
import { IBaseModel } from "./interfaces";

class BaseModel implements IBaseModel {
	declare entity: EntityTarget<{ (options?: EntityOptions): ClassDecorator; (name?: string, options?: EntityOptions): ClassDecorator; }>;
	declare dataSource: DataSource;
	declare repository: Repository<typeof Entity>;

	constructor(entity: EntityTarget<{
    (options?: EntityOptions): ClassDecorator;
    (name?: string, options?: EntityOptions): ClassDecorator; }>)
	{
		this.entity = entity;
		this.dataSource = AppDataSource;
		this.repository = AppDataSource.getRepository(this.entity);
	}

	public insert(data: object): Promise<InsertResult>{
		return this.repository.insert(data);
	}
}

export {
	BaseModel
};