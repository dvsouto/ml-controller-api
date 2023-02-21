import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateDecimalFieldsInAllTables1669534993367 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn("supplier_product", "default_profit_percentage", new TableColumn({
			name: "default_profit_percentage",
			type: "decimal",
			precision: 12,
			scale: 4,
			isNullable: false,
			default: 50
		}));
    
		await queryRunner.changeColumn("supplier_product", "supplier_price", new TableColumn({
			name: "supplier_price",
			type: "decimal",
			precision: 12,
			scale: 4,
			isNullable: false,
			default: 0
		}));

		await queryRunner.changeColumn("supplier_product", "supplier_promotional_price", new TableColumn({
			name: "supplier_promotional_price",
			type: "decimal",
			precision: 12,
			scale: 4,
			isNullable: true,
			default: 0
		}));
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async down(queryRunner: QueryRunner): Promise<void> {
		// Not to do
	}

}
