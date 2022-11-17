import * as cheerio from "cheerio";
import { IDOMParserInstance, IDOMParserInstanceOptions} from "./interfaces";


class CheerioDOMParser implements IDOMParserInstance {
	declare instance: cheerio.CheerioAPI;

	// public initialize(options?: IDOMParserInstanceOptions) {
	// 	if (! options) {
	// 		options = {} as IDOMParserInstanceOptions;
	// 	}

	// 	this.instance = cheerio.load("");

	// 	return this;
	// }

	public loadHtml(html: string) {
		this.instance = cheerio.load(html);

		return this.instance;
	}

	public loadFile(file: string) {
		return this.loadHtml(file);
	}
}

export {
	CheerioDOMParser,
};