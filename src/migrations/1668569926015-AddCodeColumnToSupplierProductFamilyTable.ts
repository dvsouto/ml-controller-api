import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddCodeColumnToSupplierProductFamilyTable1668569926015 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn("supplier_product_family", new TableColumn({
			name: "code",
			type: "varchar",
			isNullable: true,
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn("supplier_product_family", "code");
	}

}
