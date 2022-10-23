import { Server } from "../server";

class Cli {
	declare started_at: Date;
	declare finalized_at: Date;
	declare server: Server;

	constructor(){
		this.started_at = new Date();

		const date_now = this.started_at.getDate().toString().padStart(2, "0") + "/" + (this.started_at.getMonth()+1).toString().padStart(2, "0") + "/" + this.started_at.getFullYear();
		const time_now = this.started_at.getHours().toString().padStart(2, "0") + ":" + this.started_at.getMinutes().toString().padStart(2, "0") + ":" + this.started_at.getSeconds().toString().padStart(2, "0") + ":" + this.started_at.getMilliseconds().toString().padStart(3, "0");
		
		console.log("Script started at " + date_now + " " + time_now);
	}

	private async load(){
		this.server = new Server();

		await this.server.initializeCli();
	}

	public finalizated(){
		this.finalized_at = new Date();

		const date_now = this.finalized_at.getDate().toString().padStart(2, "0") + "/" + (this.finalized_at.getMonth()+1).toString().padStart(2, "0") + "/" + this.finalized_at.getFullYear();
		const time_now = this.finalized_at.getHours().toString().padStart(2, "0") + ":" + this.finalized_at.getMinutes().toString().padStart(2, "0") + ":" + this.finalized_at.getSeconds().toString().padStart(2, "0") + ":" + this.finalized_at.getMilliseconds().toString().padStart(3, "0");
		const difference_time = (this.finalized_at.getTime() - this.started_at.getTime()) / 1000;

		console.log("Script finalizated at " + date_now + " " + time_now);
		console.log("Running time " + difference_time  + "s");

		process.exit();
	}
}

export {
	Cli
};