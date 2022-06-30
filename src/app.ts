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
