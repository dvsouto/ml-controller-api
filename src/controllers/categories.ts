
import { Request, Response } from "express";
import { MercadoLivreService } from "@services/MercadoLivre";
import { Dumper, DumperStatus } from "@utils/dumper";

class CategoriesController {
	declare is_dumping: boolean;
	declare dump_promise: Promise<unknown>;
	declare has_dumped: boolean;

	constructor(){
		this.is_dumping = false;
		this.has_dumped = false;
	}

	public async list(req: Request, res: Response) {
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

			dumper.stop();

			return res.json(response);
		}

		if (dumper.getStatus() === DumperStatus.NOT_STARTED) {
			// eslint-disable-next-line no-async-promise-executor
			const dump_categories = () => new Promise(async (resolve_dump, reject_dump) => {
				const mercado_livre = new MercadoLivreService();
				const ml_response = await mercado_livre.categories.listAll();

				const promises_categories = Object.keys(ml_response.data).map((key_category) => {
					return new Promise(async (resolve, reject) => {
						const category = ml_response.data[key_category];
						const sub_categories = category.children_categories as Array<object>;
	
						const promises_sub_categories = sub_categories.map((sub_category) => {
							return new Promise((resolve_sub_category, reject_sub_category) => {
								// console.log(sub_category);
								resolve_sub_category(sub_category);
							});
						});

						const result_sub_categories = await Promise.allSettled(promises_sub_categories);
						// console.log(result_sub_categories);
						resolve(category);
					});
				});

				const result_categories = await Promise.allSettled(promises_categories);

				resolve_dump(true);

				// console.log(result_categories);
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