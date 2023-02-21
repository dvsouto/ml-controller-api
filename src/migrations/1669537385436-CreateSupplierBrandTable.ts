import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSupplierBrandTable1669537385436 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "supplier_brand",
			columns: [
				{
					name: "id",
					type: "varchar",
					isPrimary: true,
					isNullable: false,
				},
				{
					name: "supplier_id",
					type: "varchar",
					isNullable: false,
				},
				{
					name: "code",
					type: "varchar",
					isNullable: true,
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

		// Supplier Foreign Key
		await queryRunner.createForeignKey("supplier_brand", new TableForeignKey({
			columnNames: ["supplier_id"],
			referencedColumnNames: ["id"],
			referencedTableName: "supplier",
			onDelete: "CASCADE"
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("supplier_brand", true, true, true);
	}

}
