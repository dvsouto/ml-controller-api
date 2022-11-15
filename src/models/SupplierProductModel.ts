import { SupplierProduct } from "@entity/SupplierProduct";
import { BaseModel } from "./BaseModel";

type SupplierProductData = {
	id: string;
	sku: string;
  name: string;
	picture?: string;
	link?: string;
	supplier_value: number;
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