import { Cli } from "./cli";
import { MercadoLivreService } from "@src/services/MercadoLivre";

import { CategoryModel } from "@src/models/Category";
import { SubcategoryModel } from "@models/Subcategory";
import { SupplierProductFamilyModel } from "@models/SupplierProductFamily";
import { SupplierProductFamilyMLCategoryData, SupplierProductFamilyMLCategoryModel } from "@models/SupplierProductFamilyMLCategoryModel";

class GetMercadoLivreProductsCategories extends Cli {
	declare mercadolivre: MercadoLivreService;
	
	constructor(args?: Array<string>){
		super(args);

		this.mercadolivre = new MercadoLivreService();
	}

	public async run(){
		// const supplierProductModel = new SupplierProductModel();
		const supplierProductFamilyModel = new SupplierProductFamilyModel();
		const supplierProductFamilyMLCategoryModel = new SupplierProductFamilyMLCategoryModel();
		
		const categoryModel = new CategoryModel();
		const subcategoryModel = new SubcategoryModel();

		const allProductFamilies = await supplierProductFamilyModel.findAll();

		let success = 0;
		let error = 0;
		let notFoundDatabase = 0;
		let notFoundCategory = 0;

		for(const productFamily of allProductFamilies) {
			try {
				let findCategory = (await this.mercadolivre.categories.find(productFamily["name"]))["data"];
				
				if (findCategory.length > 0) {
					findCategory = findCategory[0];

					const getMLSubcategory = await subcategoryModel.findOneBy({ ml_id: findCategory["category_id"] });
					
					if (getMLSubcategory) {
						const getMLCategory = await categoryModel.findOneBy({ ml_id: getMLSubcategory["category_ml_id"] });

						console.log("@AddMLCategory:", productFamily["name"], "===", getMLSubcategory["name"], "(" + getMLCategory["name"] + ")");
					
						await supplierProductFamilyMLCategoryModel.insertOrUpdate({
							supplier_product_family_id: productFamily["id"]
						}, {
							supplier_id: productFamily["supplier_id"],
							supplier_product_family_id: productFamily["id"],
							category_ml_id: getMLCategory["ml_id"],
							subcategory_ml_id: getMLSubcategory["ml_id"],
							ml_category_name: getMLCategory["name"],
							ml_subcategory_name: getMLSubcategory["name"],
							ml_domain_id: findCategory["domain_id"] || null,
							ml_domain_name: findCategory["domain_name"] || null,
						} as SupplierProductFamilyMLCategoryData);

						success++;
					} else {
						console.log("@CategoryNotFoundInDatabase:", JSON.stringify(findCategory));
					
						notFoundDatabase++;
					}
				} else {
					console.log("@CategoryNotFound:", productFamily["name"], productFamily["sku"]);
				
					notFoundCategory++;
				}
			} catch (err) {
				console.log("@Error:", err);

				error++;
			}
		}

		console.log("\n\n");
		console.log("Added with success:", success);
		console.log("Not found on search:", notFoundCategory);
		console.log("Not found in database:", notFoundDatabase);
		console.log("Errors:", error);
		console.log("\n\n");
	}
}

export default GetMercadoLivreProductsCategories;