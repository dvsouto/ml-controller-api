import { Environment } from "@src/utils/environment";
import { Crawler } from "@utils/crawler";
import { EletrolesteHomeModule } from "./modules";

class EletrolesteService {
	declare crawler: Crawler;

	constructor(){
		this.crawler = new Crawler({
			baseUrl: Environment().get("ELETROLESTE_URL"),
		});

		console.log("@ConstructorEletroleste");
	}

	private getCrawler(): Crawler{
		return this.crawler;
	}

	public home = EletrolesteHomeModule(this.getCrawler.bind(this));
}

export {
	EletrolesteService,
};