import { Subcategory } from "@src/entity/Subcategory";
import { BaseModel } from "./BaseModel";

type SubcategoryData = {
    id?: string;
    ml_id?: string;
    category_ml_id: string;
    subcategory_ml_id?: string | null;
    name: string;
    picture?: string | null;
    permalink?: string | null;
    has_children: boolean;
    created_at?: Date;
    updated_at?: Date;
}

class SubcategoryModel extends BaseModel {
	constructor(){
		super(Subcategory);
	}
}

export {
	SubcategoryModel,
	SubcategoryData
};