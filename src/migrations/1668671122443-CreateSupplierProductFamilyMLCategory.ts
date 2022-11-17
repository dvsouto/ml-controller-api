import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from "typeorm";

export class CreateSupplierProductFamilyMLCategory1668671122443 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "supplier_product_family_ml_category",
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
					name: "supplier_product_family_id",
					type: "varchar",
					isNullable: false,
				},
				{
					name: "supplier_product_family_name",
					type: "varchar",
					isNullable: true,
				},
				{
					name: "category_ml_id",
					type: "varchar",
					isNullable: false,
				},
				{
					name: "subcategory_ml_id",
					type: "varchar",
					isNullable: false,
				},
				{
					name: "ml_category_name",
					type: "varchar",
					isNullable: true,
				},
				{
					name: "ml_subcategory_name",
					type: "varchar",
					isNullable: true,
				},
				{
					name: "ml_domain_id",
					type: "varchar",
					isNullable: true,
				},
				{
					name: "ml_domain_name",
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

		// Supplier Product Family ID Unique Index
		await queryRunner.createIndex("supplier_product_family_ml_category", new TableIndex({
			name: "IDX_SUPPLIER_PRODUCT_FAMILY_ML_CATEGORY_SUPLIER_PRODUCT_FAMILY_ID",
			columnNames: ["supplier_product_family_id"],
			isUnique: true
		}));

		// Supplier Foreign Key
		await queryRunner.createForeignKey("supplier_product_family_ml_category", new TableForeignKey({
			columnNames: ["supplier_id"],
			referencedColumnNames: ["id"],
			referencedTableName: "supplier",
			onDelete: "CASCADE"
		}));

		// ML Category ID Foreign Key
		await queryRunner.createForeignKey("supplier_product_family_ml_category", new TableForeignKey({
			columnNames: ["category_ml_id"],
			referencedColumnNames: ["ml_id"],
			referencedTableName: "category",
			onDelete: "CASCADE"
		}));

		// ML Subcategory ID Foreign Key
		await queryRunner.createForeignKey("supplier_product_family_ml_category", new TableForeignKey({
			columnNames: ["subcategory_ml_id"],
			referencedColumnNames: ["ml_id"],
			referencedTableName: "subcategory",
			onDelete: "CASCADE"
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		// await queryRunner.dropIndex("supplier_product_family_ml_category", "IDX_SUPPLIER_PRODUCT_FAMILY_ML_CATEGORY_SUPLIER_PRODUCT_FAMILY_ID");
		await queryRunner.dropTable("supplier_product_family_ml_category", true, true, true);
	}

}
