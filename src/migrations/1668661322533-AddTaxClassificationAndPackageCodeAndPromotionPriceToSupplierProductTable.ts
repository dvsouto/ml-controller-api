import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddTaxClassificationAndPackageCodeAndPromotionPriceToSupplierProductTable1668661322533 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumns("supplier_product", [
			new TableColumn({
				name: "supplier_promotional_price",
				type: "decimal",
				precision: 4,
				isNullable: true
			}),
			new TableColumn({
				name: "tax_classification",
				type: "varchar",
				isNullable: true
			}),
			new TableColumn({
				name: "package_code",
				type: "varchar",
				isNullable: true
			}),
		]);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn("supplier_product", "supplier_promotional_price");
		await queryRunner.dropColumn("supplier_product", "tax_classification");
		await queryRunner.dropColumn("supplier_product", "package_code");
	}

}
