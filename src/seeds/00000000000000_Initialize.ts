/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Factory, Seeder } from "typeorm-seeding";
import { DataSource } from "typeorm";
import { CliDataSource } from "@src/data-source";

export default class Initialize implements Seeder {
	public async run(factory: Factory, datasource: DataSource): Promise<any> {
		await CliDataSource().initialize();

		console.log("\nCli Data Source initialized!");
	}
}