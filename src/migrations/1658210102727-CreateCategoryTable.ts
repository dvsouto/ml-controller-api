import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateCategoryTable1658210102727 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "category",
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
		await queryRunner.createIndex("category", new TableIndex({
			name: "IDX_CATEGORY_ML_ID",
			columnNames: ["ml_id"],
			isUnique: true
		}));

		// Name Index
		await queryRunner.createIndex("category", new TableIndex({
			name: "IDX_CATEGORY_NAME",
			columnNames: ["name"]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropIndex("category", "IDX_CATEGORY_ML_ID");
		await queryRunner.dropIndex("category", "IDX_CATEGORY_NAME");
		await queryRunner.dropTable("category", true);
	}

}
