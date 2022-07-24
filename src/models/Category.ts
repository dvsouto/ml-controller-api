import { Category } from "@src/entity/Category";
import { BaseModel } from "./BaseModel";

type CategoryData = {
	id?: string;
	ml_id: string;
	name: string;
	picture?: string;
	permalink?: string;
	created_at?: Date;
	updated_at?: Date;
}

class CategoryModel extends BaseModel {
	constructor(){
		super(Category);
	}
}

export {
	CategoryModel,
	CategoryData
};