import { Server } from "../server";

class Cli {
	declare started_at: Date;
	declare finalized_at: Date;
	declare server: Server;
	declare result: unknown;
	declare args: Array<string>;

	declare protected resultOutput: boolean;

	constructor(args?: Array<string>){
		this.started_at = new Date();
		this.args = [];
		
		const date_now = this.started_at.getDate().toString().padStart(2, "0") + "/" + (this.started_at.getMonth()+1).toString().padStart(2, "0") + "/" + this.started_at.getFullYear();
		const time_now = this.started_at.getHours().toString().padStart(2, "0") + ":" + this.started_at.getMinutes().toString().padStart(2, "0") + ":" + this.started_at.getSeconds().toString().padStart(2, "0") + ":" + this.started_at.getMilliseconds().toString().padStart(3, "0");
		
		if (args.length > 3) {
			args.shift(); // Node path
			args.shift(); // Cli.ts path
			args.shift(); // Script argument path

			this.args = args.map(arg => arg.trim());
		}

		console.log("Script started at " + date_now + " " + time_now);

		this.resultOutput = true;
	}

	public async load(){
		this.server = new Server();

		await this.server.initializeCli();
	}

	public finalizated(result: unknown = null){
		this.finalized_at = new Date();
		this.result = result;

		const date_now = this.finalized_at.getDate().toString().padStart(2, "0") + "/" + (this.finalized_at.getMonth()+1).toString().padStart(2, "0") + "/" + this.finalized_at.getFullYear();
		const time_now = this.finalized_at.getHours().toString().padStart(2, "0") + ":" + this.finalized_at.getMinutes().toString().padStart(2, "0") + ":" + this.finalized_at.getSeconds().toString().padStart(2, "0") + ":" + this.finalized_at.getMilliseconds().toString().padStart(3, "0");
		const difference_time = (this.finalized_at.getTime() - this.started_at.getTime()) / 1000;

		if (this.resultOutput) {
			console.log("Result: ", result);
		}

		console.log("Script finalizated at " + date_now + " " + time_now);
		console.log("Running time " + difference_time  + "s");

		process.exit();
	}

	protected setResultOutput(resultOutput: boolean){
		this.resultOutput = resultOutput;
	}

	protected getArguments(): Array<string>{
		return this.args;
	}

	protected getArgument(idx: number = 0): string{
		if (this.args.length-1 >= idx) {
			return this.args[idx];
		}

		return null;
	}
}

export {
	Cli
};