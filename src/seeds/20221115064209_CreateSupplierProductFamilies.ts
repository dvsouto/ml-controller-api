/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Factory, Seeder } from "typeorm-seeding";
import { DataSource } from "typeorm";
import { SupplierProductFamilyModel } from "@models/SupplierProductFamily";

import { parseProduct } from "@utils/strings";
import supplierProductFamiliesMap from "./.maps/supplierProductFamiliesMap";
import _ from "lodash";
import fs from "fs";
 

export default class CreateSupplierProductFamilies implements Seeder {

	private getFamilies(): object{
		const map = supplierProductFamiliesMap;

		_.forEach(map, (obj_categories, supplier_id) => {
			_.forEach(obj_categories, (arr_families, category_id) => {
				_.forEach(arr_families, (obj_family) => {
					obj_family["supplier_id"] = supplier_id;
					obj_family["supplier_product_category_id"] = supplier_id + "_" + category_id;
					obj_family["prettier_name"] = parseProduct(obj_family["name"]);
				});
			});
		});

		// console.log(map["eletroleste"]["utilidades"]);

		return map;
	}

	public async run(factory: Factory, datasource: DataSource): Promise<any> {
		const map = this.getFamilies();
		const runners = [];
		const supplierProductFamilyModel = new SupplierProductFamilyModel();

		const addNext = (arr, idxAdd, resolve) => {
			const addItem = arr[idxAdd];

			console.log("@Add Family:", addItem["name"]);

			supplierProductFamilyModel.insertOrUpdate({ name: addItem["name"], supplier_product_category_id: addItem["supplier_product_category_id"] }, addItem)
				.then(() => {
					idxAdd--;

					if (idxAdd >= 0) {
						return addNext(arr, idxAdd, resolve);
					}

					resolve(true);
				})
				.catch((err) => {
					console.log("\n@Error:", err);
					console.log("@Object Error:", addItem);
					console.log("@Idx Error:", idxAdd);

					process.exit(1);
				});
		};

		_.forEach(map, (obj_categories) => {
			_.forEach(obj_categories, (arr_families) => {
				runners.push(new Promise((resolve) => {
					addNext(arr_families, (arr_families as Array<object>).length-1, resolve);
				}));
			});
		});

		const results = await Promise.allSettled(runners);

		// console.log("Results:", results);
	}
}
