import { SupplierProduct } from "@entity/SupplierProduct";
import { BaseModel } from "./BaseModel";

type SupplierProductData = {
	id?: string;
	supplier_id: string;
	sku: string;
  name: string;
	prettier_name: string;
	supplier_product_category_id?: string;
	supplier_product_family_id?: string;
	picture?: string;
	link?: string;
	supplier_price: number;
  supplier_promotional_price?: number;
	default_profit_percentage: number;
	tax_classification?: string;
	package_code?: string;
	created_at?: Date;
	updated_at?: Date;
}

class SupplierProductModel extends BaseModel<SupplierProductData> {
	constructor(){
		super(SupplierProduct);
	}
}

export {
	SupplierProductModel,
	SupplierProductData
};