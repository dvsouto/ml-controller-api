/* eslint-disable @typescript-eslint/no-explicit-any */
import { Factory, Seeder } from "typeorm-seeding";
import { DataSource } from "typeorm";
import { Supplier } from "@entity/Supplier";
import { SupplierData } from "@models/SupplierModel";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

import suppliersMap from "./.maps/suppliersMap";

export default class CreateUsers implements Seeder {
	private getSuppliers(): Array<SupplierData>{
		return suppliersMap;
	}

	public async run(factory: Factory, datasource: DataSource): Promise<any> {
		await datasource
			.createQueryBuilder()
			.insert()
			.into(Supplier)
			.values(this.getSuppliers() as QueryDeepPartialEntity<Supplier>[])
			.orIgnore("(\"id\") DO NOTHING")
			.execute();
	}
}