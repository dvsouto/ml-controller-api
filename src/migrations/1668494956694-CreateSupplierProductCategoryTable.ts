import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSupplierProductCategoryTable1668494956694 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "supplier_product_category",
			columns: [
				{
					name: "id",
					type: "varchar",
					isPrimary: true,
				},
				{
					name: "supplier_id",
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
					name: "link",
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
		await queryRunner.createForeignKey("supplier_product_category", new TableForeignKey({
			columnNames: ["supplier_id"],
			referencedColumnNames: ["id"],
			referencedTableName: "supplier",
			onDelete: "CASCADE"
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable("supplier_product_category");
		const supplierForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("supplier_id") !== -1);

		await queryRunner.dropTable("supplier_product_category", true);
		await queryRunner.dropForeignKey("supplier_product_category", supplierForeignKey);
	}
}
