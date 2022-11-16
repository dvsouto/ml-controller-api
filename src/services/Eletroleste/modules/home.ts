import { Crawler } from "@src/utils/crawler";

const EletrolesteHomeModule = (getCrawler: () => Crawler) => {
	const getHome = async () => {
		const crawler = getCrawler();
    
		const homeResponse = await crawler.getRequestProvider().get("/");
		console.log(homeResponse);

		const listaItensResponse = await crawler.getRequestProvider().get("/ListaItens.aspx", null, {
			headers: {
				"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"Access-Control-Allow-Origin": "*", 
				"Content-Type": "application/json",
				"Cookie": "_ga=GA1.3.10933283.1667970714; _gid=GA1.3.1300971562.1668490798; ASP.NET_SessionId=b4u0b0ra5xomsfmbew4gqijw; ARRAffinity=8d82ad0f62b6e1c08b496bf2b9efe4fcba4505d0fb74604f0ca2adad819a30fe; ARRAffinitySameSite=8d82ad0f62b6e1c08b496bf2b9efe4fcba4505d0fb74604f0ca2adad819a30fe; _gat_gtag_UA_36940294_1=1",
				"DNT": 1,
				"Host": "www.eletroleste.com.br",
				"Origin": "https://www.eletroleste.com.br",
				"Referer": "https://www.eletroleste.com.br/",
				"sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": "Linux",
				"Sec-Fetch-Dest": "empty",
				"Sec-Fetch-Mode": "cors",
				"Sec-Fetch-Site": "same-origin",
				"Upgrade-Insecure-Requests": 1,
			}
		});
		console.log(listaItensResponse);

		const listaProdutosResponse = await crawler.getRequestProvider().post("/WSSite.asmx/ListaProdutos", 
			// {"token": "243EC7CCC2E79070CDB27109034FD72B7C723CDCF7E93EBB8714C1EB9BCD0C39", "campoPesquisa" : "", "campoOrder": "nASC", "pagina": "1", "campoMarca": "", "campoCodFamilia": "AAAA","campoDescricaoFamilia": "", "codigoUsuario": "954160","campoPromocao": "","campoFornecedor": "","campoFamiliaPromocao": "", "campoCodFamiliaQRCode": ""}
			// {
			// 	"token":"243EC7CCC2E79070CDB27109034FD72B7C723CDCF7E93EBB8714C1EB9BCD0C39",
			// 	"campoPesquisa":"",
			// 	"campoOrder":"nASC",
			// 	"pagina":"1",
			// 	"campoMarca":"",
			// 	"campoCodFamilia":"",
			// 	"campoDescricaoFamilia":"ABAFADOR DE RUIDOS",
			// 	"codigoUsuario":"954160",
			// 	"campoPromocao":"",
			// 	"campoFornecedor":"",
			// 	"campoFamiliaPromocao":"",
			// }
			{
				"token":"243EC7CCC2E79070CDB27109034FD72B7C723CDCF7E93EBB8714C1EB9BCD0C39",
				"campoPesquisa":"",
				"campoOrder":"nASC",
				"pagina":"1",
				"campoMarca":"",
				"campoCodFamilia":"",
				"campoDescricaoFamilia":"ABAFADOR DE RUIDOS",
				"codigoUsuario":"954160",
				"campoPromocao":"",
				"campoFornecedor":"",
				"campoFamiliaPromocao":"",
				"campoCodFamiliaQRCode":""
			}
			, {
				headers: {
					"Accept": "application/json, text/javascript, */*; q=0.01",
					"Access-Control-Allow-Origin": "*", 
					"Content-Type": "application/json; charset=UTF-8",
					// "Cookie": "_ga=GA1.3.10933283.1667970714; _gid=GA1.3.1300971562.1668490798; ASP.NET_SessionId=b4u0b0ra5xomsfmbew4gqijw; ARRAffinity=8d82ad0f62b6e1c08b496bf2b9efe4fcba4505d0fb74604f0ca2adad819a30fe; ARRAffinitySameSite=8d82ad0f62b6e1c08b496bf2b9efe4fcba4505d0fb74604f0ca2adad819a30fe; _gat_gtag_UA_36940294_1=1",
					// "DNT": 1,
					// "Host": "www.eletroleste.com.br",
					// "Origin": "https://www.eletroleste.com.br",
					// "Referer": "https://www.eletroleste.com.br/ListaItens.aspx",
					// "sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
					// "sec-ch-ua-mobile": "?0",
					// "sec-ch-ua-platform": "Linux",
					// "Sec-Fetch-Dest": "document",
					// "Sec-Fetch-Mode": "navigate",
					// "Sec-Fetch-Site": "same-origin",
					// "Sec-Fetch-User": "?1",
					"X-Requested-With": "XMLHttpRequest",
				}
			});

		console.log(listaProdutosResponse);
		console.log("Data:", listaProdutosResponse["data"]);
	};

	return {
		getHome,
	};
};

export {
	EletrolesteHomeModule,
};