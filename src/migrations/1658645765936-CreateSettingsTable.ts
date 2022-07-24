import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateSettingsTable1658645765936 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "settings",
			columns: [
				{
					name: "id",
					type: "varchar",
					isPrimary: true,
					generationStrategy: "uuid",
					default: "uuid_generate_v4()",
				},
				{
					name: "name",
					type: "varchar",
					isNullable: false,
				},
				{
					name: "type",
					type: "varchar",
					isNullable: false,
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

		// Name Unique Index
		await queryRunner.createIndex("settings", new TableIndex({
			name: "IDX_SETTINGS_NAME",
			columnNames: ["name"],
			isUnique: true
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("settings", true);
	}

}
