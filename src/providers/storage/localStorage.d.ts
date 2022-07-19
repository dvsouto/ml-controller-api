import { IStorageData } from "./interfaces";

interface ILocalStorageInstance {
  getItem: (name: string) => unknown;
  setItem: (name: string, data: IStorageData) => void;
  removeItem: (name: string) => void;
}

export {
	ILocalStorageInstance
};