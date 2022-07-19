/**
 * Application entry point
 * 
 * @author Davi Souto
 * @since 29/06/2022
 */

import { Server } from "./server";

(async () => {
	const app = new Server();
	
	app.initialize();
	
	await app.listen();
})();

import { AppDataSource } from "./data-source";

AppDataSource.initialize()
	.then(() => {
		console.log("Data Source has been initializeds!");
	})
	.catch((err) => {
		console.error("Error during Data Source initialization", err);
	});