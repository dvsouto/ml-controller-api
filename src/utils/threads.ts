import { Worker, isMainThread, parentPort, workerData } from "worker_threads";

class Threads {
	declare private worker: Worker;
	declare private pid: number;

	constructor(){
		this.pid = 1 + (Math.random() * 9999);
		this.worker = new Worker(__filename, { workerData: this.pid });
	}

	public run = (execute: (value: any) => void) => {
		this.worker.on("message", execute);
		this.worker.on("error", this.handleError);
	};

	private handleError = (err) => {
		console.log("Thread " + this.pid + " error: " + err);
	};

	public getWorker = (): Worker => {
		return this.worker;
	};

	public getPid = (): number => {
		return this.pid;
	};
}

export {
	Threads,
};