import express, { Router, Request, Response, Express } from "express";
import { IServer } from "./interfaces";

class Server implements IServer {
	app: Express = express();
	route: Router = Router();

	public initialize = (): void => {
		this.middlewares();
		this.routes();
	};

	private middlewares = (): void => {
		this.app.use(express.json());
		this.app.use(this.route);
	};

	private routes = () => {
		this.route.get("/", (req: Request, res: Response) => {
			res.json({ message: "hello world with Typescript" });
		});
	};

	public listen = async (): Promise<boolean> => {
		return new Promise((resolve) => {
			this.app.listen(3333, () => {
				console.log("App running on port 3333");
				return resolve(true);
			});
		});
	};
}

export {
	Server
};