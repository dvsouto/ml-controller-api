import { DataSource, Entity, EntityOptions, EntityTarget, FindOneOptions, FindOptionsWhere, InsertResult, Repository } from "typeorm"; 
import { AppDataSource } from "@src/data-source";
import { IBaseModel } from "./interfaces";
import _ from "lodash";

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

	public findAll(): Promise<typeof Entity[]>{
		return this.repository.find();
	}

	public findOne(options: FindOneOptions): Promise<typeof Entity | null>{
		return this.repository.findOne(options);
	}

	public findOneBy(where: FindOptionsWhere<typeof Entity> | FindOptionsWhere<typeof Entity>[]): Promise<typeof Entity | null>{
		return this.repository.findOneBy(where);
	}

	public insert(data: object): Promise<InsertResult>{
		return this.repository.insert(data);
	}

	public async insertOrUpdate(where: FindOptionsWhere<typeof Entity> | FindOptionsWhere<typeof Entity>[], data: object): Promise<any>{
		const findData = await this.findOneBy(where);

		if (findData) {
			_.forOwn(data, (value, key) => {
				findData[key] = value;
			});

			return this.repository.save(findData);
		}

		return this.insert(data);
	}

	/////////

	public getRepository(): Repository<typeof Entity>{
		return this.repository;
	}
}

export {
	BaseModel
};