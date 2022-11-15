import express, { Express, Router } from "express";
import { IServer } from "./interfaces";

import { AppRouter } from "@routes/appRouter";
import { AuthenticatorMiddleware } from "@middlewares/authenticator";
import { Environment } from "@utils/environment";

import { AppDataSource, CliDataSource } from "@src/data-source";

import { Dumper } from "@utils/dumper";

class Server implements IServer {
	declare app: Express;
	declare router: Router;

	declare app_name: string;
	declare app_port: number;

	public initialize = async (): Promise<void> => {
		this.setGlobalTypes();

		this.app = express();
		this.router = express.Router();

		this.app_name = Environment().get("APP_NAME");
		this.app_port = Environment().get("APP_PORT");

		this.middlewares();
		this.routes();

		await this.connectDatabase();
	};

	public initializeCli = async (): Promise<void> => {
		this.setGlobalTypes();

		await this.connectDatabaseCli();
	};

	private middlewares = (): void => {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));

		this.app.use(AuthenticatorMiddleware);
	};

	private routes = () => {
		this.app.use(AppRouter());
	};

	private connectDatabase = async (): Promise<boolean> => {
		console.log("Tentando se conectar com o banco");

		return new Promise((resolve, reject) => {
			AppDataSource().initialize()
				.then(() => {
					console.log("Postgres conectado com sucesso!");

					return resolve(true);
				})
				.catch((err) => {
					console.log("Erro ao se conectar com o Postgres: ", err);
					return reject(false);
				});
		});
	};

	private connectDatabaseCli = async (): Promise<boolean> => {
		console.log("Tentando se conectar com o banco");

		return new Promise((resolve, reject) => {
			CliDataSource().initialize()
				.then(() => {
					console.log("Postgres conectado com sucesso!");

					return resolve(true);
				})
				.catch((err) => {
					console.log("Erro ao se conectar com o Postgres: ", err);
					return reject(false);
				});
		});
	};

	public listen = async (): Promise<boolean> => {
		return new Promise((resolve) => {
			this.app.listen(this.app_port, () => {
				console.log("App " + this.app_name + " running on port " + this.app_port.toString());
				return resolve(true);
			});
		});
	};

	private setGlobalTypes = () => {
		Dumper.initializeDumper();
	};
}

export {
	Server
};