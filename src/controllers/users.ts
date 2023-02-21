
import { Request, Response } from "express";
import { MercadoLivreService } from "@services/MercadoLivre";

class UsersController {
	public async me(req: Request, res: Response) {
		const mercado_livre = new MercadoLivreService();
		const ml_response = await mercado_livre.users.me();

		res.json({
			success: ml_response.success,
			data: ml_response.data
		});
	}

	public async createTestUser(req: Request, res: Response) {
		const mercado_livre = new MercadoLivreService();
		const ml_response = await mercado_livre.users.createTest();

		res.json({
			success: ml_response.success,
			data: ml_response.data,
		});
	}
}

export {
	UsersController,
};