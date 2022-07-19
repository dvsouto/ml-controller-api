import { RequestProvider } from "@providers/request";
import { Environment } from "@utils/environment";
import { StorageProvider } from "@providers/storage";
import { IStorageProvider } from "@providers/storage/StorageProvider.dx";
import { IMLAccessToken, MLHeaders } from "./interfaces";
import { makeRequest, MLAuthModule, MLUsersModule, MLCategoriesModule } from "./modules";

class MercadoLivreService {
	declare url: string;
	declare requestProvider: RequestProvider;
	declare storageProvider: IStorageProvider;

	declare client_id: string;
	declare client_secret: string;
	declare ml_token: IMLAccessToken | undefined;
	declare headers: MLHeaders;

	public keyAccessToken = "ml_access_token"; 

	constructor() {
		this.url = Environment().get("MERCADO_LIVRE_URL");
		this.client_id = Environment().get("MERCADO_LIVRE_CLIENT_ID");
		this.client_secret = Environment().get("MERCADO_LIVRE_CLIENT_SECRET");
		this.headers = {};
		
		if (! this.storageProvider) {
			this.storageProvider = new StorageProvider().initialize();
		}

		if (this.ml_token === undefined) {
			this.ml_token = this.storageProvider.getObject(this.keyAccessToken) as IMLAccessToken;
		}

		if (this.ml_token) {
			this.headers.Authorization = "Bearer " + this.ml_token.access_token;
		}

		this.requestProvider = new RequestProvider().initialize({
			baseUrl: this.url,
			headers: this.headers
		});
	}

	private makeRequest = makeRequest;

	private getRequestProvider = (): RequestProvider => {
		return this.requestProvider;
	};

	public auth = MLAuthModule(this.getRequestProvider);
	public categories = MLCategoriesModule(this.getRequestProvider);
	public users = MLUsersModule(this.getRequestProvider);
}

export {
	MercadoLivreService
};