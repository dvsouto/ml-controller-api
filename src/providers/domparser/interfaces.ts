import { CheerioAPI } from "cheerio";

interface IDOMParserProvider {
  instance: IDOMParserInstance;
  driver: string;
  dom: CheerioAPI | any;
  initialize: (options?: IDOMParserInstanceOptions) => IDOMParserProvider,
  loadHtml: (html: string) => IDOMParserProvider,
  loadFile: (file: string) => IDOMParserProvider,
  getDOM: () => CheerioAPI | any;
  getDOMParserInstance: () => IDOMParserInstance,
}

interface IDOMParserInstance {
  // initialize: (options?: IDOMParserInstanceOptions) => IDOMParserInstance,
  loadHtml: (html: string) => CheerioAPI | any,
  loadFile: (file: string) => CheerioAPI | any,
}

interface IDOMParserInstanceOptions {
  html?: string;
  file?: string;
}

export {
	IDOMParserProvider,
	IDOMParserInstance,
	IDOMParserInstanceOptions,
};