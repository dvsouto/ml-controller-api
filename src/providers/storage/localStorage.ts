import { LocalStorage as NodeLocalStorage } from "node-localstorage";
import { IStorage, IStorageData, IStorageOptions } from "./interfaces";
import { ILocalStorageInstance } from "./localStorage.d";
import { IStorageProvider } from "./StorageProvider";


class LocalStorage implements IStorage {
	declare instance: ILocalStorageInstance;

	public initialize(options?: IStorageOptions): IStorageProvider {
		if (! options) {
			options = {} as IStorageOptions;
			options.path = "./.localstorage";
		}

		this.instance = NodeLocalStorage(options.path) as ILocalStorageInstance;

		return this as unknown as IStorageProvider;
	}

	public get(name: string): IStorageData{
		return this.instance.getItem(name) as IStorageData;
	}

	public set(name: string, data: IStorageData){
		this.instance.setItem(name, data);
	}

	public remove(name: string){
		this.instance.removeItem(name);
	}

}

export {
	LocalStorage,
	NodeLocalStorage
};