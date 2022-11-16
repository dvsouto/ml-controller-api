import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProductFamilyTable1668504396505 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "supplier_product_family",
			columns: [
				{
					name: "id",
					type: "varchar",
					isPrimary: true,
					generationStrategy: "uuid",
					default: "uuid_generate_v4()",
				},
				{
					name: "supplier_id",
					type: "varchar",
					isNullable: false,
				},
				{
					name: "supplier_product_category_id",
					type: "varchar",
					isNullable: false,
				},
				{
					name: "name",
					type: "varchar",
					isNullable: false,
				},
				{
					name: "prettier_name",
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
		await queryRunner.createForeignKey("supplier_product_family", new TableForeignKey({
			columnNames: ["supplier_id"],
			referencedColumnNames: ["id"],
			referencedTableName: "supplier",
			onDelete: "CASCADE"
		}));

		// Supplier Product Category Foreign Key
		await queryRunner.createForeignKey("supplier_product_family", new TableForeignKey({
			columnNames: ["supplier_product_category_id"],
			referencedColumnNames: ["id"],
			referencedTableName: "supplier_product_category",
			onDelete: "CASCADE"
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable("supplier_product_family");
		const supplierForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("supplier_id") !== -1);
		const supplierProductCategoryForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("supplier_product_category_id") !== -1);

		await queryRunner.dropForeignKey("supplier_product_family", supplierForeignKey);
		await queryRunner.dropForeignKey("supplier_product_family", supplierProductCategoryForeignKey);
		await queryRunner.dropTable("supplier_product_family", true);
	}

}
