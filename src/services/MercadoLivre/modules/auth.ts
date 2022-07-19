import { makeRequest } from "./makeRequest";
import { Environment } from "@utils/environment";
import { MLResponse } from "@services/MercadoLivre/interfaces";
import { RequestProvider } from "@providers/request";

const MLAuthModule = (getRequestProvider: () => RequestProvider) => {
	const client_id = Environment().get("MERCADO_LIVRE_CLIENT_ID");
	const client_secret = Environment().get("MERCADO_LIVRE_CLIENT_SECRET");
	
	const getAccessToken = (): Promise<MLResponse> => {
		const requestProvider = getRequestProvider();

		return makeRequest(requestProvider.post("/oauth/token", {
			client_id: client_id,
			client_secret: client_secret,
			grant_type: "client_credentials"
		}, {
			forceQueryString: true
		}));
	};

	return {
		getAccessToken
	};
};

export {
	MLAuthModule
};