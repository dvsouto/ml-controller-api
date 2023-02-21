import { makeRequest } from "./makeRequest";
import { MLResponse } from "@services/MercadoLivre/interfaces";
import { RequestProvider } from "@providers/request";
import { Environment } from "@src/utils/environment";

const MLUsersModule = (getRequestProvider: () => RequestProvider) => {
  
	const me = (): Promise<MLResponse> => {
		const requestProvider = getRequestProvider();

		return makeRequest(requestProvider.get("/users/me"));
	};

	const createTest = (): Promise<MLResponse> => {
		const requestProvider = getRequestProvider();

		return makeRequest(requestProvider.post("/users/test_user", {
			site_id: Environment.get("MERCADO_LIVRE_SITE_ID")
		}));
	};

	return {
		me,
		createTest,
	};
};

export {
	MLUsersModule
};