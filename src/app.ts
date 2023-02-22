/**
 * Application entry point
 * 
 * @author Davi Souto
 * @since 29/06/2022
 */

import { Server } from "./server";

export const execute = (async () => {
	const app = new Server();
	
	await app.initialize();
	
	await app.listen();
})();
