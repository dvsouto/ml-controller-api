import { SupplierProductFamilyMLCategory } from "@entity/SupplierProductFamilyMLCategory";
import { BaseModel } from "./BaseModel";

type SupplierProductFamilyMLCategoryData = {
	id?: string;
  supplier_id: string;
  supplier_product_family_id: string;
  supplier_product_family_name?: string;
  category_ml_id: string;
  subcategory_ml_id: string;
  ml_category_name?: string;
  ml_subcategory_name?: string;
  ml_domain_id?: string;
  ml_domain_name?: string;
	created_at?: Date;
	updated_at?: Date;
}

class SupplierProductFamilyMLCategoryModel extends BaseModel<SupplierProductFamilyMLCategoryData> {
	constructor(){
		super(SupplierProductFamilyMLCategory);
	}
}

export {
	SupplierProductFamilyMLCategoryModel,
	SupplierProductFamilyMLCategoryData
};