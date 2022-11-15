import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
// import { User } from "./entity/User";
// import { Environment } from "./utils/environment";

import dotenv from "dotenv";

dotenv.config();

const dataSourceOptions = {
	applicationName: "ml-controller-api",
	type: "postgres",
	schema: "public",
	connectTimeoutMS: 5000,
	synchronize: false,
	logging: false,
	migrationsTransactionMode: "each",
	entities: ["./src/entity/*.ts"],
	migrations: ["./src/migrations/*.ts"],
	subscribers: [],
	extra: {
		options: "-c statement_timeout=5500ms",
		idleTimeoutMillis: 10000,
		max: 10,
		connectionTimeoutMillis: 5000,
	},
};

export const AppDataSource = (): DataSource => {
	if (! global.DataSource) {
		global.DataSource = new DataSource({
			...dataSourceOptions,
			host: process.env.PG_HOST,
			port: parseInt(process.env.PG_PORT),
			username: process.env.PG_USER,
			password: process.env.PG_PASSWORD,
			database: process.env.PG_DB,
		} as DataSourceOptions);
	}

	return global.DataSource as DataSource;
};



export const CliDataSource = (): DataSource => {
	if (! global.CliDataSource) {
		global.CliDataSource = new DataSource({
			...dataSourceOptions,
			host: "localhost",
			port: parseInt(process.env.PG_PORT),
			username: process.env.PG_USER,
			password: process.env.PG_PASSWORD,
			database: process.env.PG_DB,
		} as DataSourceOptions);
	}

	return global.CliDataSource as DataSource;
};

