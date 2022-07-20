/**
 * Application entry point
 * 
 * @author Davi Souto
 * @since 29/06/2022
 */

import { Server } from "./server";
import { DumperStatus } from "./utils/dumper";

(async () => {
	const app = new Server();
	
	await app.initialize();
	
	await app.listen();
})();

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-var
global.dumper = {
	is_dumping: false,
	has_dumped: false,
	status: DumperStatus.NOT_STARTED,
	message: "",
	data: {
		started_at: null,
		finalized_at: null,
		running_time: null
	} as DumperData,
	time: {
		started_at: null,
		finalized_at: null,
	} as DumperTime
} as dumper;