import { makeRequest } from "./makeRequest";
import { MLResponse } from "@services/MercadoLivre/interfaces";
import { RequestProvider } from "@providers/request";

const MLUsersModule = (getRequestProvider: () => RequestProvider) => {
  
	const me = (): Promise<MLResponse> => {
		const requestProvider = getRequestProvider();

		return makeRequest(requestProvider.get("/users/me"));
	};

	return {
		me
	};
};

export {
	MLUsersModule
};