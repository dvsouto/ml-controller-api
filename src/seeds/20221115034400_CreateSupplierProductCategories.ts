/* eslint-disable @typescript-eslint/no-explicit-any */
import { Factory, Seeder } from "typeorm-seeding";
import { DataSource, InsertResult } from "typeorm";
import { SupplierProductCategory } from "@entity/SupplierProductCategory";
// import { SupplierProductCategoryData } from "@models/SupplierProductCategoryModel";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { replaceAccents } from "@utils/strings";

import supplierProductCategoriesMap from "./.maps/supplierProductCategoriesMap";
import _ from "lodash";
 
export default class CreateSupplierProductCategories implements Seeder {
	private getCategories(): object{
		const map = supplierProductCategoriesMap;

		_.forEach(map, (arr_categories, supplier_id) => {
			_.forEach(arr_categories, (obj_category, idx_category) => {
				map[supplier_id][idx_category].id = supplier_id + "_" + replaceAccents(obj_category["name"].toLowerCase()).replace(" ", "_");
				map[supplier_id][idx_category].supplier_id = supplier_id;
			});
		});

		return map;
	}

	public async run(factory: Factory, datasource: DataSource): Promise<any> {
		const runners = [] as Array<Promise<InsertResult>>;
		_.forEach(this.getCategories(), async (arr_categories) => {
			runners.push(datasource
				.createQueryBuilder()
				.insert()
				.into(SupplierProductCategory)
				.values(arr_categories as QueryDeepPartialEntity<SupplierProductCategory>[])
				.orIgnore("(\"id\") DO NOTHING")
				.execute()); 
		});

		await Promise.allSettled(runners);
	}
}