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
		await this.eletroleste.products.requestListItens();
		const families = await this.eletroleste.families.getAllFamilies();

		const listProducts = await this.eletroleste.products.getListAllProducts(families);

		// console.log(home);
		console.log(listProducts);
		console.log("TOTAL:", Object.keys(listProducts).length);

		// console.log(families);

	}
}

export default GetEletrolesteProductsFamilies;