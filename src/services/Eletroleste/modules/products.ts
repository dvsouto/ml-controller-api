import { Crawler, CrawlerResponseType, RequestMethod } from "@src/utils/crawler";
import { EletrolesteSession } from "..";

type EletrolesteProduct = {
	sku: number;
	name: string;
	package: string;
	taxClassification: string | number;
	price: number;
	promotionalPrice: number;
	familyCode: string;
}
const EletrolesteProductsModule = (getCrawler: () => Crawler, getSession: () => EletrolesteSession) => {
	const requestListItens = async () => {
		const crawler = getCrawler();
		const session = getSession();

		crawler.setAcceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9");
		crawler.setContentTypeHeader("application/json");
		
		console.log("@EletrolesteRequestListItens");

		const listaItensResponse = await crawler.makeRequest({
			url: "/ListaItens.aspx",
			method: RequestMethod.GET,
			responseType: CrawlerResponseType.DOM,
			headers: {
				"sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": "Linux",
				"Sec-Fetch-Dest": "empty",
				"Sec-Fetch-Mode": "cors",
				"Sec-Fetch-Site": "same-origin",
				"Origin": "https://www.eletroleste.com.br",
				"Referer": "https://www.eletroleste.com.br/",
				"Upgrade-Insecure-Requests": 1,
			}
		});

		return listaItensResponse;
	};

	const requestListProducts = async (findFamily: string = "", page: number = 1) => {
		const crawler = getCrawler();
		const session = getSession();

		crawler.setAcceptHeader("application/json, text/javascript, */*; q=0.01");
		crawler.setContentTypeHeader("application/json; charset=UTF-8");

		console.log("@EletrolesteRequestListProducts", findFamily, page);

		const sendData = {
			"token": session.token,
			"campoPesquisa":"",
			"campoOrder":"nASC",
			"pagina": page.toString(),
			"campoMarca":"",
			"campoCodFamilia":"",
			"campoDescricaoFamilia": findFamily,
			"codigoUsuario": session.userId,
			"campoPromocao":"",
			"campoFornecedor":"",
			"campoFamiliaPromocao":"",
			"campoCodFamiliaQRCode":""
		};

		const listaProdutosResponse = await crawler.makeRequest({
			url: "/WSSite.asmx/ListaProdutos",
			method: RequestMethod.POST,
			responseType: CrawlerResponseType.JSON,
			params: sendData,
			headers: {
				"Access-Control-Allow-Origin": "*", 
				"X-Requested-With": "XMLHttpRequest",
				"Referer": "https://www.eletroleste.com.br/ListaItens.aspx",
				"sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": "Linux",
				"Sec-Fetch-Dest": "document",
				"Sec-Fetch-Mode": "navigate",
				"Sec-Fetch-Site": "same-origin",
				"Sec-Fetch-User": "?1",
			}
		});

		return listaProdutosResponse;
	};

	const getListProducts = async (findFamily: string = "") => {
		const products = [];

		console.log("@EletrolesteListProducts", findFamily);

		const _requestListProducts = async (findFamily: string = "", page: number = 1): Promise<Array<EletrolesteProduct>> => {
			const requestData = (await requestListProducts(findFamily, page)).data["d"];

			const findedItens = parseInt(requestData[0]["QuantidadeItensLista"]);
			const countShowItens = 20;
			const pages = (findedItens > 0) ? Math.ceil(findedItens / countShowItens) : page;

			for(const product of requestData) {
				products.push({
					sku: parseInt(product["Codigo"]),
					name: product["Descricao"],
					package: product["Embalagem"] || "",
					taxClassification: product["ClassificacaoFiscal"] || "",
					price: parseFloat(product["Preco"]),
					promotionalPrice: parseFloat(product["Promocao"]),
					familyCode: product["Familia"]
				} as EletrolesteProduct);
			}

			if (page < pages) {
				return _requestListProducts(findFamily, page+1);
			}

			return products;
		};

		return await _requestListProducts(findFamily);
	};

	const getListAllProducts = async (families: Array<string>): Promise<Array<EletrolesteProduct>> => {
		const allProducts = {} as Array<EletrolesteProduct>;

		for(const familyCode of families){
			allProducts[familyCode] = await getListProducts(familyCode);
		}

		return allProducts;
	};

	return {
		requestListItens,
		requestListProducts,

		getListProducts,
		getListAllProducts,
	};
};

export {
	EletrolesteProductsModule,

	EletrolesteProduct,
};