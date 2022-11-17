import { RequestProvider } from "@providers/request";
import { DOMParserProvider } from "@providers/domparser";
import { RequestHeaders, RequestMethod } from "@src/providers/request/interfaces";
import { AxiosResponse } from "axios";
import { CheerioAPI } from "cheerio";

type CrawlerOptions = {
  baseUrl?: string;
  headers?: RequestHeaders;
	persistHeaders?: boolean;
	userAgent?: CrawlerUserAgent;
}

enum CrawlerUserAgentVersions {
  Chrome107 = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
	Firefox107 = "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:107.0) Gecko/20100101 Firefox/107.0",
	Opera38 = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36 OPR/38.0.2220.41",
	Opera92 = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 OPR/92.0.4561.33",
	Edge91 = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59",
	Safari605 = "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15",

	IE9Mobile_WindowsPhone = "Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)",
	Safari604Mobile_iOS = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1",
	
	Curl7 = "curl/7.64.1",
	Postman7 = "PostmanRuntime/7.29.2",
}

enum CrawlerUserAgentLatest {
	ChromeLatest = CrawlerUserAgentVersions.Chrome107,
	FirefoxLatest = CrawlerUserAgentVersions.Firefox107,
	OperaLatest = CrawlerUserAgentVersions.Opera92,
	EdgeLatest = CrawlerUserAgentVersions.Edge91,

	IEMobileLatest = CrawlerUserAgentVersions.IE9Mobile_WindowsPhone,
	SafariMobileLatest = CrawlerUserAgentVersions.Safari604Mobile_iOS,

	CurlLatest = CrawlerUserAgentVersions.Curl7,
	PostmanLatest = CrawlerUserAgentVersions.Postman7,
}

type CrawlerUserAgent = CrawlerUserAgentVersions | CrawlerUserAgentLatest;

enum CrawlerResponseType {
	TEXT = "text",
	HTML = "html",
	JSON = "json",
	XML = "xml",
	DOM = "dom",
}

type CrawlerMakeRequestOptions = {
	url?: string;
	method?: RequestMethod;
	responseType?: CrawlerResponseType;
	applyAcceptHeader?: boolean;
	headers?: RequestHeaders;
	params?: object;
}


type CrawlerResponse = {
	httpCode: number;
	data: string | object | CheerioAPI;
	response: AxiosResponse;
}

class Crawler {
	declare requestProvider: RequestProvider;
	declare domParserProvider: DOMParserProvider;
	declare baseUrl: string;
	declare headers: RequestHeaders;
	declare persistHeaders: boolean;

	defaultHeaders = {
		"Accept": "*/*",
		"Accept-Encoding": "gzip, deflate, br",
		"Connection": "keep-alive",
	} as RequestHeaders;

	constructor(options: CrawlerOptions) {
		if (! options) {
			options = {} as CrawlerOptions;
		}

		if (! options.headers) {
			options.headers = {} as RequestHeaders;
		}

		if (options.persistHeaders !== true && options.persistHeaders !== false) {
			options.persistHeaders = true;
		}

		if (! options.userAgent) {
			options.userAgent = CrawlerUserAgentLatest.ChromeLatest;
		}

		this.setBaseUrl(options.baseUrl);
		this.setPersistHeaders(options.persistHeaders);
		this.setHeaders({
			...this.defaultHeaders,
			...options.headers
		});
		this.setUserAgent(options.userAgent);

		this.requestProvider = new RequestProvider().initialize({
			baseUrl: this.baseUrl,
			headers: this.headers,
			withCredentials: true,
			timeout: 60000,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			validateStatus: (status: number) => {
				return true;
			}
		});

		this.domParserProvider = new DOMParserProvider().initialize();
	}

	public setBaseUrl(baseUrl: string): void{
		this.baseUrl = baseUrl;
	}

	public setHeaders(headers: RequestHeaders): void{
		this.headers = headers;
	}

	public setPersistHeaders(persistHeaders: boolean): void{
		this.persistHeaders = persistHeaders;
	}

	public setUserAgent(userAgent: CrawlerUserAgent): void{
		this.setHeaders({
			...this.headers,
			"User-Agent": userAgent,
		});
	}

	public setAcceptHeader(accept: string): void{
		this.setHeaders({
			...this.headers,
			"Accept": accept,
		});
	}

	public setContentTypeHeader(contentType: string): void{
		this.setHeaders({
			...this.headers,
			"Content-Type": contentType,
		});
	}

	public getRequestProvider(): RequestProvider{
		return this.requestProvider;
	}

	public getDOMParserProvider(): DOMParserProvider{
		return this.domParserProvider;
	}

	private applyDefaultMakeRequestOptions(options: CrawlerMakeRequestOptions): CrawlerMakeRequestOptions {
		if (! options) {
			options = {} as CrawlerMakeRequestOptions;
		}

		if (! options.url) {
			options.url = "/";
		}

		if (! options.method) {
			options.method = RequestMethod.GET;
		}

		if (! options.responseType) {
			options.responseType = CrawlerResponseType.TEXT;
		}

		if (! options.applyAcceptHeader) {
			options.applyAcceptHeader = true;
		}

		if (! options.headers) {
			options.headers = {};
		}


		if (! options.params) {
			options.params = {};
		}

		return options;
	}

	public async makeRequest(options?: CrawlerMakeRequestOptions): Promise<CrawlerResponse>{
		options = this.applyDefaultMakeRequestOptions(options);

		const headers = {
			...this.headers,
			...options.headers
		};

		if (this.persistHeaders && options.headers) {
			this.setHeaders(headers);
		}

		return new Promise((resolve) => {

			this.getRequestProvider().request(options.url, options.method, options.params, {
				headers: headers,
				forceQueryString: options.method === RequestMethod.GET
			}).then((response: AxiosResponse) => {
				let data = response.data;
	
				switch(options.responseType) {
				case CrawlerResponseType.DOM:
					if (typeof data === "object") {
						data = JSON.stringify(data);
					}
	
					data = this.domParserProvider.loadHtml(data).getDOM();
	
					break;
				case CrawlerResponseType.JSON:
					if (typeof data === "string") {
						data = JSON.parse(data);
					}
	
					break;
				case CrawlerResponseType.TEXT:
				case CrawlerResponseType.HTML:
				default:
					if (typeof data === "object") {
						data = JSON.stringify(data);
					}
	
					data = data.toString();
	
					break;
				}
	
				const responseReturn = {
					httpCode: response.status,
					response: response,
					data: data
				} as CrawlerResponse;

				resolve(responseReturn);
			});
		});
	}
}

export {
	Crawler,
	CrawlerOptions,

	CrawlerUserAgent,
	CrawlerUserAgentVersions,
	CrawlerUserAgentLatest,

	CrawlerResponseType,

	RequestHeaders,
	RequestMethod,
};