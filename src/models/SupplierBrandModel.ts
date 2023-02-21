import { SupplierBrand } from "@entity/SupplierBrand";
import { BaseModel } from "./BaseModel";

type SupplierBrandData = {
  id: string;
  supplier_id: string;
  code?: string;
  name: string;
  picture?: string;
	created_at?: Date;
	updated_at?: Date;
}

class SupplierBrandModel extends BaseModel<SupplierBrandData> {
	constructor(){
		super(SupplierBrand);
	}
}

export {
	SupplierBrandModel,
	SupplierBrandData
};