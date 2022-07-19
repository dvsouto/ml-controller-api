import { Request, Response, NextFunction } from "express";
import { StorageProvider } from "@providers/storage";
import { MercadoLivreService } from "@services/MercadoLivre";

// import { IStorageData } from "@providers/storage/interfaces";

const AuthenticatorMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const mercado_livre = new MercadoLivreService();

	const keyAccessToken = mercado_livre.keyAccessToken;
	const storageProvider = new StorageProvider().initialize();
	const access_token = storageProvider.getObject(keyAccessToken);

	if (! access_token) {
		console.log("@@@ Sem token");

		const ml_response = await mercado_livre.auth.getAccessToken();
    
		storageProvider.setObject(keyAccessToken, ml_response.data);
		
		return next();
	}

	console.log("@@@ Token:", access_token);

	return next();
};

export {
	AuthenticatorMiddleware
};