#!/bin/bash

name=$1
date=$(date '+%Y%m%d%H%M%S')
filename="${date}_${name}.ts"

echo "Creating ${name} seeder..."

touch ./src/seeds/${filename}
echo "/* eslint-disable @typescript-eslint/no-explicit-any */
import { Factory, Seeder } from \"typeorm-seeding\";
import { DataSource } from \"typeorm\";
import { QueryDeepPartialEntity } from \"typeorm/query-builder/QueryPartialEntity\";
 
export default class CreateSupplierCategories implements Seeder {

	public async run(factory: Factory, datasource: DataSource): Promise<any> {
		await datasource
			.createQueryBuilder()
			.insert()
			.into(/* Entity */)
			.values(/* EntityData[] */ as QueryDeepPartialEntity</* Entity */>[])
			.orIgnore(\"(\\"id\\") DO NOTHING\")
			.execute();
	}
}" >> ./src/seeds/${filename}