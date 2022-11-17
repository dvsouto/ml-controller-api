import { Crawler, CrawlerResponseType, RequestMethod } from "@src/utils/crawler";
import { EletrolesteSession } from "..";

enum EletrolesteFamilyCode {
  ELETRICA = "AAAA",
  HIDRAULICA = "CCCC",
  FERRAGENS = "DDDD",
  TINTAS = "FFFF",
  UTILIDADES = "LLLL",
  MAQUINAS = "KKKK",
  SEGURANCA = "BBBB",
  LED = "MMMM",
}


const EletrolesteFamiliesModule = (getCrawler: () => Crawler, getSession: () => EletrolesteSession) => {
	const findFamily = async (code: EletrolesteFamilyCode): Promise<Array<string>> => {
		const crawler = getCrawler();
		const session = getSession();

		crawler.setAcceptHeader("application/json, text/javascript, */*; q=0.01");
		crawler.setContentTypeHeader("application/json; charset=UTF-8");

		console.log("@EletrolesteFindFamily", code);

		const sendData = {
			"token": session.token,
			"familia": code,
			"campoPesquisa":""
		};

		const familiesResponse = await crawler.makeRequest({
			url: "/WSSite.asmx/ListaFamilias",
			method: RequestMethod.POST,
			responseType: CrawlerResponseType.JSON,
			params: sendData,
			headers: {
				"sec-ch-ua": "Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99",
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": "Linux",
				"Sec-Fetch-Dest": "empty",
				"Sec-Fetch-Mode": "cors",
				"Sec-Fetch-Site": "same-origin",
				"X-Requested-With": "XMLHttpRequest"
			}
		});

		const familiesData = familiesResponse.data["d"];
		const familiesFinded = [];

		for(const familyItem of familiesData) {
			familiesFinded.push(familyItem["Descricao"]);
		}

		return familiesFinded as Array<string>;
	};

	const getAllFamilies = async (): Promise<Array<string>> => {
		const findAllFamilies = [
			EletrolesteFamilyCode.ELETRICA,
			EletrolesteFamilyCode.HIDRAULICA,
			EletrolesteFamilyCode.FERRAGENS,
			EletrolesteFamilyCode.TINTAS,
			EletrolesteFamilyCode.UTILIDADES,
			EletrolesteFamilyCode.MAQUINAS,
			EletrolesteFamilyCode.SEGURANCA,
			EletrolesteFamilyCode.LED,
		];

		let findedFamilies = [];

		console.log("@EletrolesteFindAllFamilies");

		for(const findFamilyCode of findAllFamilies) {
			const thisListFamilies = await findFamily(findFamilyCode);

			findedFamilies = [
				...findedFamilies,
				...thisListFamilies,
			];
		}

		findedFamilies.sort();

		return findedFamilies;
	};

	return {
		findFamily,
		getAllFamilies,
	};
};

export {
	EletrolesteFamiliesModule,
	EletrolesteFamilyCode,
};