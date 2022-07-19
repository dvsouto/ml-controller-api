import { IStorage } from "./interfaces";

interface IStorageProvider extends IStorage {
  getString(name: string): string | null;
  setString(name: string, data: string): void;
  getInteger(name: string): number | null;
  setInteger(name: string, data: number): void;
  getFloat(name: string, precision?: number): number | null;
  setFloat(name: string, data: number): void;
  getObject(name: string): object | null;
  setObject(name: string, data: object): void;
}

export {
	IStorageProvider
};