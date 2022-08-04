import { DataSource, Entity, EntityOptions, EntityTarget, FindOneOptions, FindOptionsWhere, InsertResult, Repository } from "typeorm"; 
import { AppDataSource } from "@src/data-source";
import { IBaseModel, ModelColumn } from "./interfaces";
import _, { forEach } from "lodash";

class BaseModel<ModelData> implements IBaseModel<ModelData> {
	declare entity: EntityTarget<{ (options?: EntityOptions): ClassDecorator; (name?: string, options?: EntityOptions): ClassDecorator; }>;
	declare dataSource: DataSource;
	declare repository: Repository<typeof Entity>;

	/**
	 * Create model
	 * 
	 * @constructor
	 * @param {EntityTarget} entity - Model entity
	 */
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

	public insert(data: ModelData): Promise<InsertResult>{
		return this.repository.insert(data);
	}

	public async insertOrUpdate(where: FindOptionsWhere<typeof Entity> | FindOptionsWhere<typeof Entity>[], data: ModelData): Promise<any>{
		const findData = await this.findOneBy(where);

		if (findData) {
			_.forOwn(data, (value, key) => {
				findData[key] = value;
			});

			return this.repository.save(findData);
		}

		return this.insert(data);
	}

	public async insertIfNotExists(where: FindOptionsWhere<typeof Entity> | FindOptionsWhere<typeof Entity>[], data: ModelData): Promise<any>{
		const findData = await this.findOneBy(where);

		if (findData) {
			return new Promise((resolve) => {
				resolve(findData);
			});
		}

		return this.insert(data);
	}

	/////////

	public getRepository(): Repository<typeof Entity>{
		return this.repository;
	}
		
	/////////

	/**
	 * Get model columns
	 * 
	 * @returns {Record<string, ModelColumn>} - Object with ModelColumn's
	 */
	protected getColumns(): Record<string, ModelColumn> {
		const metaData = this.dataSource.getMetadata(this.entity);
		const ownColumns = metaData.ownColumns;

		const columns = {} as Record<string, ModelColumn>;

		forEach(ownColumns, (column) => {
			const typeColumn = typeof column.type === "function" ? column.type.toString().toLowerCase().match(/(string|number|integer|int|bigint|smallint|float|double|real|money|date|time|timestamp|varchar|char|character|boolean|text|bytea|bit|uuid|json|xml|serial|blob)/ig)?.[0] : column.type.toLowerCase();

			columns[column.propertyName] = {
				type: typeColumn,
				isPrimary: column.isPrimary,
				isNullable: column.isNullable,
				databaseName: column.databaseName
			} as ModelColumn;
		}); 

		return columns as Record<string, ModelColumn>;
	}
}

export {
	BaseModel
};