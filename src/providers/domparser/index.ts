import { CheerioDOMParser } from "./cheerioDOMParser";
import { IDOMParserProvider, IDOMParserInstance, IDOMParserInstanceOptions } from "./interfaces";
import { Environment } from "@utils/environment";

class DOMParserProvider implements IDOMParserProvider {
	declare dom;
	declare instance: IDOMParserInstance;
	declare driver: string;

	public initialize(options?: IDOMParserInstanceOptions): IDOMParserProvider {
		this.driver = Environment().get("DOMPARSER_DRIVER");

		if (! options) {
			options = {} as IDOMParserInstanceOptions;
		}

		switch(this.driver) {
		case "cheerio":
		default:
			this.instance = new CheerioDOMParser();
			break;
		}

		if (options.html) {
			this.loadHtml(options.html);
		}

		if (options.file) {
			this.loadFile(options.file);
		}


		return this as IDOMParserProvider;
	}

	public loadHtml(html: string){
		console.log("@Instance2", this.instance);
		this.dom = this.instance.loadHtml(html);

		return this;
	}

	public loadFile(file: string){
		this.dom = this.instance.loadFile(file);

		return this;
	}

	public getDOM(){
		return this.dom;
	}

	public getDOMParserInstance(): IDOMParserInstance {
		return this.instance;
	}
}

export {
	DOMParserProvider,
	IDOMParserProvider,
};