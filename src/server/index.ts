import express, { Express, Router } from "express";
import { IServer } from "./interfaces";

import { AppRouter } from "@routes/appRouter";
import { AuthenticatorMiddleware } from "@middlewares/authenticator";
import { Environment } from "@utils/environment";

class Server implements IServer {
	declare app: Express;
	declare router: Router;

	declare app_name: string;
	declare app_port: number;

	public initialize = (): void => {
		this.app = express();
		this.router = express.Router();

		this.app_name = Environment().get("APP_NAME");
		this.app_port = Environment().get("APP_PORT");

		this.middlewares();
		this.routes();
	};

	private middlewares = (): void => {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));

		this.app.use(AuthenticatorMiddleware);
	};

	private routes = () => {
		this.app.use(AppRouter());
	};

	public listen = async (): Promise<boolean> => {
		return new Promise((resolve) => {
			this.app.listen(this.app_port, () => {
				console.log("App " + this.app_name + " running on port " + this.app_port.toString());
				return resolve(true);
			});
		});
	};
}

export {
	Server
};