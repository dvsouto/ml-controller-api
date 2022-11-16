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
	default_profit_percentage: number;
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