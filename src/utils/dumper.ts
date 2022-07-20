import moment from "moment";

enum DumperStatus {
  NOT_STARTED = "not_started",
  DUMPING = "dumping",
  FINALIZED = "finalized",
  FAIL = "fail"
}

class Dumper {
	declare dumper: dumper;

	constructor(){
		this.dumper = this.getDumper();

		if (this.getStatus() !== DumperStatus.NOT_STARTED) {
			this.dumper.data.running_time = this.getRunningTime();
		}
	}

	private getTimeNow = (): string => {
		return moment().format("YYYY-MM-DD HH:mm:ss:SSS");
	};

	private getRunningTime = (): number => {
		const started_at = this.dumper.time.started_at;
		const time_now = moment.now();
		const running_time = time_now - started_at;

		return running_time;
	};

	public start = (execute: () => Promise<unknown>): Promise<boolean> => {
		this.dumper.status = DumperStatus.DUMPING;
		this.dumper.data.started_at = this.getTimeNow();
		this.dumper.data.finalized_at = null;
		this.dumper.data.running_time = 0;
    
		this.dumper.time.started_at = moment.now();

		return new Promise((resolve, reject) => {
			execute()
				.then(() => {
					this.dumper.is_dumping = false;
					this.dumper.status = DumperStatus.FINALIZED;
					this.dumper.message = "Dumper finalized";
					this.dumper.has_dumped = true;
					this.dumper.data.finalized_at = this.getTimeNow();
					this.dumper.time.finalized_at = moment.now();

					return resolve(true);
				})
				.catch((err) => {
					this.dumper.is_dumping = false;
					this.dumper.status = DumperStatus.FAIL;
					this.dumper.message = "Dumper fail: " + err;
					this.dumper.has_dumped = true;
					this.dumper.data.finalized_at = this.getTimeNow();
					this.dumper.time.finalized_at = moment.now();

					return reject(false);
				});
		});
	};

	public stop = (): void => {
		this.dumper.is_dumping = false;
		this.dumper.has_dumped = false;
		this.dumper.status = DumperStatus.NOT_STARTED;
		this.dumper.message = "";

		this.dumper.time.finalized_at = null;
		this.dumper.time.started_at = null;

		global.dumper = this.dumper;
	};

	public isDumping = (): boolean => {
		return this.dumper.is_dumping;
	};

	public getStatus = (): DumperStatus => {
		return this.dumper.status as DumperStatus;
	};

	public getMessage = (): string => {
		return this.dumper.message;
	};

	public hasDumped = (): boolean => {
		return this.dumper.has_dumped;
	};

	public getData = (): DumperData => {
		return global.dumper.data as DumperData;
	};

	public getDumper = (): dumper => {
		return global.dumper as dumper;
	};

}

export {
	Dumper,

	DumperStatus
};