import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSupplierTable1666407510664 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "supplier",
			columns: [
				{
					name: "id",
					type: "varchar",
					isPrimary: true,
				},
				{
					name: "name",
					type: "varchar",
					isNullable: false,
				},
				{
					name: "cnpj",
					type: "varchar",
					isNullable: true,
				},
				{
					name: "razao_social",
					type: "varchar",
					isNullable: true,
				},
				{
					name: "picture",
					type: "varchar",
					isNullable: true
				},
				{
					name: "username",
					type: "varchar",
					isNullable: true,	
				},
				{
					name: "password",
					type: "varchar",
					isNullable: true,	
				},
				{
					name: "link",
					type: "varchar",
					isNullable: true,	
				},
				{
					name: "address",
					type: "varchar",
					isNullable: true,
				},
				{
					name: "email",
					type: "varchar",
					isNullable: true,
				},
				{
					name: "phones",
					type: "varchar",
					isNullable: true,
				},
				{
					name: "facebook",
					type: "varchar",
					isNullable: true,
				},
				{
					name: "instagram",
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
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("supplier", true);
	}

}
