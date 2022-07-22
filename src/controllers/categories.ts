/* eslint-disable no-prototype-builtins */

import { Request, Response } from "express";
import { MercadoLivreService } from "@services/MercadoLivre";
import { Dumper, DumperStatus } from "@utils/dumper";

import { CategoryModel } from "@models/Category";

import _ from "lodash";

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

				console.log(add_categories);
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