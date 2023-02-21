import { Cli } from "./cli";
import { CSVController } from "@utils/CSVController";

import { SupplierModel, SupplierData } from "@models/Supplier";
import { SupplierProductModel, SupplierProductData } from "@models/SupplierProductModel";

// import _ from "lodash";
class LoadProductsCsv extends Cli {
	declare csv: CSVController;
	declare supplier_id: string;
	declare supplier: SupplierData;
	
	constructor(args?: Array<string>){
		super(args);

		this.csv = new CSVController({ filename: "09_11_2022_produtos.csv"});
		this.setResultOutput(false);
		this.supplier_id = this.getArgument(0) || "eletroleste";
	}

	private getPictureUrl(sku: number): string | null{
		if (this.supplier_id == "eletroleste") {
			return "http://www.eletroleste.com.br/images/produtos/" + sku.toString() + "_3.jpg";
		}

		return null;
	}

	private treatSku(sku: number): number{
		if (this.supplier_id == "eletroleste") {
			// Remove last char "1" in SKU of eletrolest (Temporaly bug??) 
			if (sku.toString()[sku.toString().length-1] == "1") {
				sku = parseInt(sku.toString().substring(0, sku.toString().length-1));
			}
		}

		return sku;
	}

	private async save(data: Array<object>){
		const supplierProductModel = new SupplierProductModel();

		console.log("\n\n@Saving...");

		for(const addItem of data) {
			const sku = this.treatSku(addItem["sku"]);
			console.log("@Add to Database SKU:", sku, addItem["name"], "(" + addItem["prettier_name"] + ")");

			await supplierProductModel.insertOrUpdate({ 
				sku: sku,
				supplier_id: this.supplier_id,
			}, {
				...addItem as SupplierProductData,
				sku: sku.toString(),
				picture: this.getPictureUrl(sku),
				supplier_price: (addItem["price"] !== undefined) ? addItem["price"] : addItem["supplier_price"],
				supplier_id: this.supplier_id,
				default_profit_percentage: 50,
			} as SupplierProductData);
		}
	}

	public async run(){
		const supplierModel = new SupplierModel();
		const findSupplier = await supplierModel.findOneBy({ "id": this.supplier_id });

		if (! findSupplier) {
			console.log("Non-existent supplier \"" + this.supplier_id + "\"");

			process.exit(1);
		}

		this.supplier = findSupplier as unknown as SupplierData;

		const data = await this.csv.read();

		await this.save(data);

		return data;
	}
}

export default LoadProductsCsv;