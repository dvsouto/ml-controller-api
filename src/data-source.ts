import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
// import { User } from "./entity/User";
// import { Environment } from "./utils/environment";

import dotenv from "dotenv";

import { join } from "path";

dotenv.config();

const dataSourceOptions = {
	applicationName: "ml-controller-api",
	type: "postgres",
	schema: "public",
	connectTimeoutMS: 5000,
	synchronize: false,
	logging: false,
	migrationsTransactionMode: "each",
	// entities: ["./src/entity/*.ts"],
	// migrations: ["./src/migrations/*.ts"],
	entities: [join(__dirname, "entity", "*.{ts,js}")],
	migrations: [join(__dirname, "migrations", "*.{ts,js}")],
	subscribers: [],
	extra: {
		options: "-c statement_timeout=15000ms",
		idleTimeoutMillis: 10000,
		max: 25,
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

