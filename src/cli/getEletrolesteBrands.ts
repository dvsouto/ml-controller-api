import { Cli } from "./cli";
import { EletrolesteService } from "@src/services/Eletroleste";

import { SupplierBrandModel, SupplierBrandData } from "@models/SupplierBrandModel";
import { SupplierProductModel, SupplierProductData } from "@models/SupplierProductModel";
import { EletrolesteProduct } from "@src/services/Eletroleste/modules/products";

import * as fs from "fs";

// import { SupplierModel, SupplierData } from "@models/SupplierModel";

// import _ from "lodash";
class GetEletrolesteBrands extends Cli {
	declare eletroleste: EletrolesteService;
	
	constructor(args?: Array<string>){
		super(args);

		console.log("@ConstructorGetEletrolesteBrands");

		this.eletroleste = new EletrolesteService();
	}

	public async run(){
		const supplierBrandModel = new SupplierBrandModel();
		const supplierProductModel = new SupplierProductModel();
		
		const listProducts = {};

		// await this.eletroleste.home.getHome();
		// await this.eletroleste.products.requestListItens();

		// const families = await this.eletroleste.families.getAllFamilies();
		// listProducts = await this.eletroleste.products.getListAllProducts(families);

		console.log("@Total of Products:", Object.keys(listProducts).length);

		let errors = 0;
		const success = 0;

		for(const familyName of Object.keys(listProducts)) {
			const products = listProducts[familyName] as Array<EletrolesteProduct>;
			
			for(const product of products) {
				const findFamily = await supplierProductFamilyModel.findOneBy({ name: familyName.trim() });
				const findProduct = await supplierProductModel.findOneBy({ sku: product.sku });

				if (! findFamily) {
					console.log("@FamilyNotFound:", familyName.trim());
					errors++;

					break;
				}

				if (! findProduct) {
					console.log("@ProductNotFound:", product.name, product.sku);
					errors++;
					break;
				}

				supplierProductModel.updateById(findProduct["id"], 
					{
						...findProduct,
						supplier_product_category_id: findFamily["supplier_product_category_id"],
						supplier_product_family_id: findFamily["id"],
						supplier_promotional_price: findProduct["promotionalPrice"],
						tax_classification: findProduct["taxClassification"] ? findProduct["taxClassification"].trim() : null,
						package_code: findProduct["package"] ? findProduct["package"].trim() : null,
					} as SupplierProductData
				);

				console.log("@ProductUpdated:", product.name, product.sku);
			}
		}

		console.log("Finalizated with", errors, "errors and ", success, "success!");
	}
}

export default GetEletrolesteBrands;