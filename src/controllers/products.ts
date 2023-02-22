import { Request, response, Response } from "express";
import { MercadoLivreService } from "@services/MercadoLivre";

class ProductsController {
	declare mercado_livre: MercadoLivreService;

	public async test(req: Request, res: Response) {
		const mercado_livre = new MercadoLivreService();

		res.json({
			success: true,
			data: mercado_livre.auth.getAccessToken()
		});
	}
}

export {
	ProductsController,
};