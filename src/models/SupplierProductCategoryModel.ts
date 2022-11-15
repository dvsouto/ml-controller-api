import { SupplierProductCategory } from "@entity/SupplierProductCategory";
import { BaseModel } from "./BaseModel";

type SupplierProductCategoryData = {
	id: string;
	supplier_id: string;
  name: string;
	picture?: string;
	link?: string;
	created_at?: Date;
	updated_at?: Date;
}

class SupplierProductCategoryModel extends BaseModel<SupplierProductCategoryData> {
	constructor(){
		super(SupplierProductCategory);
	}
}

export {
	SupplierProductCategoryModel,
	SupplierProductCategoryData
};