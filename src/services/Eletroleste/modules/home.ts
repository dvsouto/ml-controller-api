import { Crawler, CrawlerResponseType, RequestMethod } from "@src/utils/crawler";
import { EletrolesteSession } from "..";

const EletrolesteHomeModule = (getCrawler: () => Crawler, getSession: () => EletrolesteSession) => {
	const getHome = async () => {
		const crawler = getCrawler();
		const session = getSession();

		console.log("@EletrolesteRequestHome");
    
		const homeResponse = await crawler.makeRequest({
			url: "/",
			method: RequestMethod.GET,
			responseType: CrawlerResponseType.DOM,
		});

		return homeResponse;
	};

	return {
		getHome,
	};
};

export {
	EletrolesteHomeModule,
};