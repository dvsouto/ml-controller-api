import { Cli } from "./cli";
import { EletrolesteService } from "@src/services/Eletroleste";

// import { SupplierModel, SupplierData } from "@models/SupplierModel";
// import { SupplierProductModel, SupplierProductData } from "@models/SupplierProductModel";

// import _ from "lodash";
class GetEletrolesteProductsFamilies extends Cli {
	declare eletroleste: EletrolesteService;
	
	constructor(args?: Array<string>){
		super(args);

		console.log("@ConstructorGetEletrolesteProductsFamilies");
		this.eletroleste = new EletrolesteService();
	}

	public async run(){
		await this.eletroleste.home.getHome();
	}
}

export default GetEletrolesteProductsFamilies;