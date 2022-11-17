import { Supplier } from "@entity/Supplier";
import { BaseModel } from "./BaseModel";

type SupplierData = {
	id: string;
  name: string;
	cnpj?: string;
	razao_social?: string;
	picture?: string;
  username?: string;
  password?: string;
	link?: string;
	address?: string;
	email?: string;
	phones?: string;
	facebook?: string;
	instagram?: string;
	created_at?: Date;
	updated_at?: Date;
}

class SupplierModel extends BaseModel<SupplierData> {
	constructor(){
		super(Supplier);
	}
}

export {
	SupplierModel,
	SupplierData
};