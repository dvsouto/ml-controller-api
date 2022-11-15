import { Environment } from "./src/utils/environment";
import { DataSourceOptions } from "typeorm";
// import path from "path";

export default {
	"name": "default",
	"type": "postgres",
	"host": Environment().get("PG_HOST"),
	"port": Environment().get("PG_PORT"),
	"username": Environment().get("PG_USER"),
	"password": Environment().get("PG_PASSWORD"),
	"database": Environment().get("PG_DB"),
	"synchronize": false,
	"entities": [
		"src/entity/**/*.ts"
	],
	"migrations": [
		"src/migrations/**/*.ts"
	],
	"subscribers": [
		"src/subscriber/**/*.ts"
	],
	"seeds": [
		"src/seeds/**/*{.ts,.js}"
	],
  "factories":  [
		"src/factories/**/*{.ts,.js}"
	],
	"cli": {
		"entitiesDir": "src/entity",
		"migrationsDir": "src/migrations",
		"subscribersDir": "src/subscriber"
	}
} as DataSourceOptions;