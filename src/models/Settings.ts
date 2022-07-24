import { Settings } from "@src/entity/Settings";
import { BaseModel } from "./BaseModel";

type SettingsData = {
	id?: string;
	name: string;
	type: string;
	created_at?: Date;
	updated_at?: Date;
}

enum SettingsType {
  STRING = "string",
  BOOLEAN = "boolean",
  NUMBER = "number",
  ARRAY_STRING = "array_string",
  ARRAY_NUMBER = "array_number",
  ARRAY_BOOLEAN = "array_boolean",
  ARRAY = "array",
  OBJECT = "object"
}

class SettingsModel extends BaseModel {
	constructor(){
		super(Settings);
	}
}

export {
	SettingsModel,
	SettingsData,
	SettingsType
};