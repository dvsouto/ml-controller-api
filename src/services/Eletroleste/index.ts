import { Environment } from "@src/utils/environment";
import { Crawler } from "@utils/crawler";
import { EletrolesteFamiliesModule, EletrolesteHomeModule, EletrolesteProductsModule } from "./modules";

type EletrolesteSession = {
	token?: string;
	userId?: string;
}
class EletrolesteService {
	declare crawler: Crawler;
	declare session: EletrolesteSession;

	constructor(){
		this.crawler = new Crawler({
			baseUrl: Environment().get("ELETROLESTE_URL"),
			headers: {
				"Access-Control-Allow-Origin": "*", 
				"Cookie": "_ga=GA1.3.10933283.1667970714; _gid=GA1.3.1300971562.1668490798; ASP.NET_SessionId=b4u0b0ra5xomsfmbew4gqijw; ARRAffinity=8d82ad0f62b6e1c08b496bf2b9efe4fcba4505d0fb74604f0ca2adad819a30fe; ARRAffinitySameSite=8d82ad0f62b6e1c08b496bf2b9efe4fcba4505d0fb74604f0ca2adad819a30fe; _gat_gtag_UA_36940294_1=1",
				"DNT": 1,
				"Host": "www.eletroleste.com.br",
			}
		});

		this.session = {
			token: "243EC7CCC2E79070CDB27109034FD72B7C723CDCF7E93EBB8714C1EB9BCD0C39",
			userId: Environment().get("ELETROLESTE_USER_ID")
		};
	}

	private getCrawler(): Crawler{
		return this.crawler;
	}

	private getSession(): EletrolesteSession{
		return this.session;
	}

	public home = EletrolesteHomeModule(this.getCrawler.bind(this), this.getSession.bind(this));
	public products = EletrolesteProductsModule(this.getCrawler.bind(this), this.getSession.bind(this));
	public families = EletrolesteFamiliesModule(this.getCrawler.bind(this), this.getSession.bind(this));
}

export {
	EletrolesteService,

	EletrolesteSession
};