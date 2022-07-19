import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateCategoryTable1658210102727 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "category",
			columns: [
				{
					name: "id",
					type: "int",
					isPrimary: true
				},
				{
					name: "name",
					type: "varchar",
				}
			]
		}), true);

		await queryRunner.createIndex("category", new TableIndex({
			name: "IDX_CATEGORY_NAME",
			columnNames: ["name"]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropIndex("category", "IDX_CATEGORY_NAME");
		await queryRunner.dropTable("category", true);
	}

}
