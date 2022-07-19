import { IStorageProvider } from "./StorageProvider";

interface IStorage {
  initialize: (options: IStorageOptions) => IStorageProvider,
  get: (name: string) => IStorageData,
  set: (name: string, data: IStorageData) => void,
  remove: (name: string) => void,
}

interface IStorageOptions {
  path?: string;
}

type IStorageData = string | number | object;

export {
	IStorage,
	IStorageData,
	IStorageOptions
};