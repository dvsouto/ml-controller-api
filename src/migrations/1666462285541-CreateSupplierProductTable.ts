import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSupplierProductTable1666462285541 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "supplier_product",
			columns: [
				{
					name: "id",
					type: "varchar",
					isPrimary: true,
					generationStrategy: "uuid",
					default: "uuid_generate_v4()",
				},
				{
					name: "sku",
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
					isNullable: true,
				},
				{
					name: "supplier_value",
					type: "decimal",
					precision: 4,
					isNullable: false
				},
				{
					name: "default_profit_percentage",
					type: "decimal",
					precision: 2,
					isNullable: false,
					default: 50,
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
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("supplier_product", true);
	}
}
