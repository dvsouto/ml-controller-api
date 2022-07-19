import { Request, Response } from "express";
import { MercadoLivreService } from "@services/MercadoLivre";
import { MLResponse } from "@services/MercadoLivre/interfaces";

class AuthController {
	public async getAccessToken(req: Request, res: Response) {
		const mercado_livre = new MercadoLivreService();
		const ml_response = await mercado_livre.auth.getAccessToken().catch((err) => console.log(err)) as MLResponse;

		res.json({
			success: ml_response.success,
			data: ml_response.data
		});
	}
}

export {
	AuthController,
};