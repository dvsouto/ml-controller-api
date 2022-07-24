/* eslint-disable no-prototype-builtins */

import { Request, Response } from "express";
import { MercadoLivreService } from "@services/MercadoLivre";
import { Dumper, DumperStatus } from "@utils/dumper";

import { CategoryData, CategoryModel } from "@models/Category";

import _ from "lodash";
import { SubcategoryData, SubcategoryModel } from "@src/models/Subcategory";

class CategoriesController {
	public async list(req: Request, res: Response) {
		// const category = AppDataSource.getRepository(Category);
		const categoryModel = new CategoryModel();

		categoryModel.insert({
			ml_id: "haha",
			name: "Teste"
		}).then(() => console.log("Inserido com sucesso"))
			.catch((err) => console.log("Erro ao inserir: ", err));

		const mercado_livre = new MercadoLivreService();
		const ml_response = await mercado_livre.categories.list();

		res.json({
			success: ml_response.success || true,
			data: ml_response.data
		});
	}

	public async listAll(req: Request, res: Response) {
		const mercado_livre = new MercadoLivreService();
		const ml_response = await mercado_livre.categories.listAll();

		res.json({
			success: ml_response.success,
			data: ml_response.data
		});
	}

	public async dump(req: Request, res: Response) {
		const dumper = new Dumper();

		if (dumper.getStatus() === DumperStatus.FINALIZED || dumper.getStatus() === DumperStatus.FAIL) {
			const response = {
				success: dumper.getStatus() === DumperStatus.FINALIZED ? true : false,
				message: dumper.getMessage(),
				data: dumper.getData(),
			};

			setTimeout(() => dumper.stop(), 500);

			return res.json(response);
		}

		if (dumper.getStatus() === DumperStatus.NOT_STARTED) {
			// eslint-disable-next-line no-async-promise-executor, @typescript-eslint/no-unused-vars
			const dump_categories = () => new Promise(async (resolve_dump, reject_dump) => {
				const mercado_livre = new MercadoLivreService();
				const ml_response = await mercado_livre.categories.listAll();
				const all_categories = ml_response.data as object;

				const add_categories = {} as object;

				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				_.forEach(all_categories, async (obj_category, idx_category) => {
					const path_from_root = obj_category["path_from_root"] as Array<object>;
					const parent_category = path_from_root[0] as object;

					// console.log("@Path:", path_from_root);

					_.forEach(path_from_root, async (obj_path_category, idx_path_category) => {

						if (idx_path_category == 0 && ! add_categories.hasOwnProperty(obj_path_category["id"])) {
							add_categories[obj_path_category["id"] as string] = {
								id: obj_path_category["id"],
								name: obj_path_category["name"],
								subcategories: [] as Array<string>
							} as object;

							console.log("@Add category:", obj_path_category["id"], obj_path_category["name"]);

							// Continue
							return true;
						}

						if (! (add_categories[parent_category["id"] as string]["subcategories"] as Array<string>).includes(obj_path_category["id"] as string)) {
							console.log("@Add subcategory:", obj_path_category["id"], obj_path_category["name"]);
	
							(add_categories[parent_category["id"] as string]["subcategories"] as Array<string>).push(obj_path_category["id"] as string);
						}
					});
				});

				const categoryModel = new CategoryModel();
				const subcategoryModel = new SubcategoryModel();

				_.forEach(add_categories, async (obj_category) => {
					const ml_category = all_categories[obj_category["id"]];

					const this_category = await categoryModel.insertOrUpdate({ ml_id: ml_category["id"] as string}, {
						ml_id: ml_category["id"] as string,
						name: ml_category["name"] as string,
						permalink: ml_category["permalink"] as string | null,
						picture: ml_category["picture"] as string | null
					} as CategoryData);

					_.forEach(obj_category["subcategories"], async (key_subcategory: string) => {
						const ml_subcategory = all_categories[key_subcategory];
						const ml_subcategory_path_from_root = ml_subcategory["path_from_root"] as Array<object>;
						const has_children = (ml_subcategory["children_categories"] as Array<object>).length > 0;
						const ml_subcategory_parent = ml_subcategory_path_from_root.length > 2 ? ml_subcategory_path_from_root[ml_subcategory_path_from_root.length-2] : null;
						const subcategory_ml_id = ml_subcategory_parent ? ml_subcategory_parent["id"] : null;
						
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						const this_subcategory = await subcategoryModel.insertOrUpdate({ ml_id: ml_subcategory["id"] }, {
							ml_id: ml_subcategory["id"],
							category_ml_id: this_category["ml_id"],
							subcategory_ml_id: subcategory_ml_id,
							name: ml_subcategory["name"],
							picture: ml_subcategory["picture"],
							permalink: ml_subcategory["permalink"],
							has_children: has_children
						} as SubcategoryData);
					});
				});

				console.log("OK!");

				resolve_dump(true);
			});
			
			dumper.start(dump_categories);
		}

		return res.json({
			success: true,
			message: "Dumping, please wait...",
			data: dumper.getData(),
		});
	}
}

export {
	CategoriesController,
};