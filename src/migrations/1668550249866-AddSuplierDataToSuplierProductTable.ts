import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddSuplierDataToSuplierProductTable1668550249866 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumns("supplier_product", [
			new TableColumn({
				name: "link",
				type: "varchar",
				isNullable: true,
			}),
			new TableColumn({
				name: "prettier_name",
				type: "varchar",
				isNullable: false,
				default: null,
			}),
			new TableColumn({
				name: "supplier_id",
				type: "varchar",
				isNullable: false,
			}),
			new TableColumn({
				name: "supplier_product_category_id",
				type: "varchar",
				isNullable: true,
			}),
			new TableColumn({
				name: "supplier_product_family_id",
				type: "varchar",
				isNullable: true,
			}),
		]);

		await queryRunner.changeColumn("supplier_product", "supplier_value", new TableColumn({
			name: "supplier_price",
			type: "decimal",
			precision: 4,
			isNullable: false
		}));

		// Supplier Foreign Key
		await queryRunner.createForeignKey("supplier_product", new TableForeignKey({
			columnNames: ["supplier_id"],
			referencedColumnNames: ["id"],
			referencedTableName: "supplier",
			onDelete: "CASCADE"
		}));

		// Supplier Product Category Foreign Key
		await queryRunner.createForeignKey("supplier_product", new TableForeignKey({
			columnNames: ["supplier_product_category_id"],
			referencedColumnNames: ["id"],
			referencedTableName: "supplier_product_category",
			onDelete: "CASCADE"
		}));

		// Supplier Product Family Foreign Key
		await queryRunner.createForeignKey("supplier_product", new TableForeignKey({
			columnNames: ["supplier_product_family_id"],
			referencedColumnNames: ["id"],
			referencedTableName: "supplier_product_family",
			onDelete: "CASCADE"
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable("supplier_product");
		const supplierForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("supplier_id") !== -1);
		const supplierProductCategoryForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("supplier_product_category_id") !== -1);
		const supplierProductFamilyForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("supplier_product_family_id") !== -1);

		await queryRunner.dropForeignKey("supplier_product", supplierForeignKey);
		await queryRunner.dropForeignKey("supplier_product", supplierProductCategoryForeignKey);
		await queryRunner.dropForeignKey("supplier_product", supplierProductFamilyForeignKey);

		await queryRunner.changeColumn("supplier_product", "supplier_price", new TableColumn({
			name: "supplier_value",
			type: "decimal",
			precision: 4,
			isNullable: false
		}));

		await queryRunner.dropColumn("supplier_product", "link");
		await queryRunner.dropColumn("supplier_product", "prettier_name");
		await queryRunner.dropColumn("supplier_product", "supplier_id");
		await queryRunner.dropColumn("supplier_product", "supplier_product_category_id");
		await queryRunner.dropColumn("supplier_product", "supplier_product_family_id");
	}

}
