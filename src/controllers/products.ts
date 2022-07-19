import { Request, response, Response } from "express";
import { MercadoLivreService } from "@services/MercadoLivre";

class ProductsController {
	declare mercado_livre: MercadoLivreService;

	public async test(req: Request, res: Response) {
		const mercado_livre = new MercadoLivreService();
		const ml_response = await mercado_livre.getAccessToken().catch((err) => console.log(err));

		res.json({
			success: true,
			data: ml_response.data
		});
	}
}

export {
	ProductsController,
};