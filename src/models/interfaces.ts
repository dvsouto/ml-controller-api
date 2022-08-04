import { DataSource, Entity, EntityOptions, EntityTarget, FindOneOptions, FindOptionsWhere, InsertResult, Repository } from "typeorm";

// interface IBaseModelData<ModelData> {
// 	[P in keyof ModelData]: string;
// }

interface IBaseModel<ModelData> {
  entity: EntityTarget<{ (options?: EntityOptions): ClassDecorator; (name?: string, options?: EntityOptions): ClassDecorator; }>;
	dataSource: DataSource;
	repository: Repository<typeof Entity>;

	/**
	 * Returns all registers
	 * 
	 * @returns {Promise<typeof Entity[]>} Promise that resolves returning all registers
	 */
	findAll: () => Promise<typeof Entity[]>;

	/**
	 * Find one register
	 * 
	 * @param {FindOneOptions} options Find one options
	 * @returns {Promise<typeof Entity | null>} Promise that resolves returning one register or null
	 */
	findOne: (options: FindOneOptions) => Promise<typeof Entity | null>;
	
	/**
	 * Find one register using where
	 * 
	 * @param {FindOptionsWhere<typeof Entity> | FindOptionsWhere<typeof Entity>[]} where Find by where
	 * @returns {Promise<typeof Entity | null>} Promise that resolves returning one register or null
	 */
	findOneBy: (where: FindOptionsWhere<typeof Entity> | FindOptionsWhere<typeof Entity>[]) => Promise<typeof Entity | null>;
  
	/**
	 * Insert one register
	 * 
	 * @param {ModelData} data Insert data
	 * @returns {Promise<InsertResult>} Promise that resolves returning InsertResult
	 */
	insert: (data: ModelData) => Promise<InsertResult>;
	
	/**
	 * Insert or update one register
	 * 
	 * @param {FindOptionsWhere<typeof Entity> | FindOptionsWhere<typeof Entity>[]} where - Find one register by where
	 * @param {ModelData} data Insert/update data
	 * @returns {Promise<InsertResult>} Promise thar resolves returning InsertResult
	 */
	insertOrUpdate: (where: FindOptionsWhere<typeof Entity> | FindOptionsWhere<typeof Entity>[], data: ModelData) => Promise<any>; 
	
	/**
	 * Insert one register if not exists
	 * 
	 * @param {FindOptionsWhere<typeof Entity> | FindOptionsWhere<typeof Entity>[]} where - Find one register by where
	 * @param {ModelData} data Insert/find data
	 * @returns {Promise<any>} Promise that resolves returning the register
	 */
	insertIfNotExists: (where: FindOptionsWhere<typeof Entity> | FindOptionsWhere<typeof Entity>[], data: ModelData) => Promise<any>;


	/**
	 * Get TypeORM entity repository
	 * 
	 * @returns {Repository<typeof Entity>} TypeORM Repository
	 */
	getRepository: () => Repository<typeof Entity>; 
	//update: (where: FindOptionsWhere<typeof Entity> | FindOptionsWhere<typeof Entity>[], data: object) => Promise<[]>;
}

type ModelColumn = {
	type: string;
	isPrimary: boolean;
	isNullable: boolean;
	databaseName: string;
}

export {
	IBaseModel,
	ModelColumn
};