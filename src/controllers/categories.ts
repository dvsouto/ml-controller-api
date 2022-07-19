
import { Request, Response } from "express";
import { MercadoLivreService } from "@services/MercadoLivre";

class CategoriesController {
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

		// if (typeof(ml_response) === "string") {
		// 	ml_response = JSON.parse(ml_response)
		// 	console.log(JSON.parse(ml_response));
		// }

		console.log(ml_response);

		res.json({
			success: ml_response.success,
			data: ml_response.data
		});
	}
}

export {
	CategoriesController,
};