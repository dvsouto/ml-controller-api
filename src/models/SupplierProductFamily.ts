import { SupplierProductFamily } from "@entity/SupplierProductFamily";
import { BaseModel } from "./BaseModel";

type SupplierProductFamilyData = {
	id: string;
	supplier_id: string;
	supplier_product_category_id: string;
  name: string;
  prettier_name: string;
	picture?: string;
	link?: string;
	created_at?: Date;
	updated_at?: Date;
}

class SupplierProductFamilyModel extends BaseModel<SupplierProductFamilyData> {
	constructor(){
		super(SupplierProductFamily);
	}
}

export {
	SupplierProductFamilyModel,
	SupplierProductFamilyData
};