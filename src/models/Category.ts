import { Category } from "@src/entity/Category";
import { BaseModel } from "./BaseModel";

class CategoryModel extends BaseModel {
	constructor(){
		super(Category);
	}
}

export {
	CategoryModel
};