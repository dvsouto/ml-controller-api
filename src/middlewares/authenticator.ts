import { Request, Response, NextFunction } from "express";
import { StorageProvider } from "@providers/storage";
import { MercadoLivreService } from "@services/MercadoLivre";
import { IMLAccessToken } from "@src/services/MercadoLivre/interfaces";
import { IStorageProvider } from "@src/providers/storage/StorageProvider.dx";
// import { IStorageData } from "@providers/storage/interfaces";

const _createMLToken = async (storageProvider: IStorageProvider, mercado_livre: MercadoLivreService) => {
	const keyAccessToken = mercado_livre.keyAccessToken;
	const ml_response = await mercado_livre.auth.getAccessToken();

	const token_data = {
		...ml_response.data,
		created_at: Date.now(),
		expires_at: Date.now() + (ml_response.data["expires_in"] * 1000)
	} as IMLAccessToken;

	storageProvider.setObject(keyAccessToken, token_data);

	console.log("@@@ Token gerado:", token_data);

	return token_data;
};

const AuthenticatorMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const mercado_livre = new MercadoLivreService();

	const keyAccessToken = mercado_livre.keyAccessToken;
	const storageProvider = new StorageProvider().initialize();
	const access_token = storageProvider.getObject(keyAccessToken);

	if (! access_token) {
		console.log("@@@ Sem token");

		await _createMLToken(storageProvider, mercado_livre);
		
		return next();
	} else {
		const timeToExpires = (access_token as IMLAccessToken).expires_at - Date.now();

		if (timeToExpires <= 0) {
			console.log("@@@ Token expirado");

			await _createMLToken(storageProvider, mercado_livre);

			return next();
		}
	}

	console.log("@@@ Token:", access_token);

	return next();
};

export {
	AuthenticatorMiddleware
};