import { Category } from "@entity/Category";
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

class CategoryModel extends BaseModel<CategoryData> {
	constructor(){
		super(Category);
	}
}

export {
	CategoryModel
};