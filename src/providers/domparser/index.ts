import { CheerioDOMParser } from "./cheerioDOMParser";
import { IDOMParserProvider, IDOMParserInstance, IDOMParserInstanceOptions } from "./interfaces";
import { Environment } from "@utils/environment";

class DOMParserProvider implements IDOMParserProvider {
	declare instance: IDOMParserInstance;
	declare driver: string;

	public initialize(options?: IDOMParserInstanceOptions): IDOMParserProvider {
		this.driver = Environment().get("DOMPARSER_DRIVER");

		switch(this.driver) {
		case "cheerio":
		default:
			this.instance = new CheerioDOMParser();
			this.instance.initialize(options);
			break;
		}

		return this as IDOMParserProvider;
	}

	public getDOMParserInstance(): IDOMParserInstance {
		return this.instance;
	}
}

export {
	DOMParserProvider,
	IDOMParserProvider,
};