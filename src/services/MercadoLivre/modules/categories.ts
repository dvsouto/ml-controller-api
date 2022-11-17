import { makeRequest } from "./makeRequest";
import { MLResponse } from "@services/MercadoLivre/interfaces";
import { RequestProvider } from "@providers/request";
import { Environment } from "@utils/environment";

const MLCategoriesModule = (getRequestProvider: () => RequestProvider) => {
  
	const list = (): Promise<MLResponse> => {
		const requestProvider = getRequestProvider();
		const site_id = Environment().get("MERCADO_LIVRE_SITE_ID");

		return makeRequest(requestProvider.get("/sites/" + site_id + "/categories"));
	};

	const listAll = (): Promise<MLResponse> => {
		const requestProvider = getRequestProvider();
		const site_id = Environment().get("MERCADO_LIVRE_SITE_ID");

		return makeRequest(requestProvider.get("/sites/" + site_id + "/categories/all"));
	};

	const find = (product: string): Promise<any> => {
		const requestProvider = getRequestProvider();
		const site_id = Environment().get("MERCADO_LIVRE_SITE_ID");

		return makeRequest(requestProvider.get("/sites/" + site_id + "/domain_discovery/search", {
			limit: 1,
			q: product
		}));
	};

	return {
		list,
		listAll,
		
		find,
	};
};

export {
	MLCategoriesModule
};