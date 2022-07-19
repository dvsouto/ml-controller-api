import { LocalStorage } from "./localStorage";
import { IStorage, IStorageData, IStorageOptions } from "./interfaces";
import { IStorageProvider } from "./StorageProvider.dx";
import { Environment } from "@utils/environment";

class StorageProvider implements IStorageProvider {
	declare instance: IStorage;
	declare driver: string;

	public initialize(options?: IStorageOptions): IStorageProvider {
		this.driver = Environment().get("STORAGE_DRIVER");

		switch(this.driver) {
		case "local_storage":
		default:
			this.instance = new LocalStorage();
			this.instance.initialize(options);
			break;
		}
    
		return this as IStorageProvider;
	}
  
	public get(name: string): IStorageData {
		return this.instance.get(name) as IStorageData;
	}

	public set(name: string, data: IStorageData): void {
		return this.instance.set(name, data);
	}

	public remove(name: string): void {
		return this.instance.remove(name);
	}

	public getString(name: string): string | null {
		const data = this.instance.get(name);

		if (data) {
			return data.toString();
		}

		return null;
	}

	public setString(name: string, data: string): void {
		return this.instance.set(name, data.toString());
	}

	public getInteger(name: string): number | null {
		// eslint-disable-next-line prefer-const
		let data = this.getString(name);

		if (data) {
			return parseInt(data.toString()) as number;
		}

		return null;
	}

	public setInteger(name: string, data: number): void {
		return this.instance.set(name, parseInt(data.toString()) as number);
	}

	public getFloat(name: string, precision?: number) {
		// eslint-disable-next-line prefer-const
		const data = this.getString(name);

		if (data) {
			// eslint-disable-next-line prefer-const
			let data_number = parseFloat(data.toString()) as number;

			if (precision && precision > 0) {
				data_number = parseFloat(data_number.toPrecision(precision)) as number;
			}

			return data_number;
		}

		return null;
	}

	public setFloat(name: string, data: number): void {
		return this.instance.set(name, parseFloat(data.toString()));
	}

	public getObject(name: string): object | null {
		// eslint-disable-next-line prefer-const
		let data = this.getString(name);

		if (data) {
			try {
				return JSON.parse(data.toString());
			} catch {
				return null;
			}
		}

		return null;
	}

	public setObject(name: string, data: object): void {
		return this.instance.set(name, JSON.stringify(data));
	}
}

export {
	StorageProvider,
	IStorageProvider
};