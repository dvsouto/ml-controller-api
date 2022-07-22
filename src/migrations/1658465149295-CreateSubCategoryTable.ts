import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex  } from "typeorm";

export class CreateSubCategoryTable1658465149295 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "subcategory",
			columns: [
				{
					name: "id",
					type: "varchar",
					isPrimary: true,
					generationStrategy: "uuid",
					default: "uuid_generate_v4()",
				},
				{
					name: "ml_id",
					type: "varchar",
					isNullable: false,
				},
				{
					name: "category_ml_id",
					type: "varchar",
					isNullable: false,
				},
				{
					name: "name",
					type: "varchar",
					isNullable: false,
				},
				{
					name: "picture",
					type: "varchar",
					isNullable: true
				},
				{
					name: "permalink",
					type: "varchar",
					isNullable: true,	
				},
				{
					name: "has_children",
					type: "boolean",
					isNullable: false,
					default: true,
				},
				{
					name: "created_at",
					type: "timestamp",
					isNullable: false,
					default: "now()"
				},
				{
					name: "updated_at",
					type: "timestamp",
					isNullable: false,
					default: "now()",
				},
			],
		}), true);

		// ML_ID Unique Index
		await queryRunner.createIndex("subcategory", new TableIndex({
			name: "IDX_SUBCATEGORY_ML_ID",
			columnNames: ["ml_id"],
			isUnique: true
		}));

		// Name Index
		await queryRunner.createIndex("subcategory", new TableIndex({
			name: "IDX_SUBCATEGORY_NAME",
			columnNames: ["name"]
		}));

		// Category Foreign Key
		await queryRunner.createForeignKey("subcategory", new TableForeignKey({
			columnNames: ["category_ml_id"],
			referencedColumnNames: ["ml_id"],
			referencedTableName: "category",
			onDelete: "CASCADE"
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable("subcategory");
		const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("category_ml_id") !== -1);

		await queryRunner.dropIndex("subcategory", "IDX_SUBCATEGORY_ML_ID");
		await queryRunner.dropIndex("subcategory", "IDX_SUBCATEGORY_NAME");
		await queryRunner.dropForeignKey("subcategory", foreignKey);
		await queryRunner.dropTable("subcategory", true);
	}

}
