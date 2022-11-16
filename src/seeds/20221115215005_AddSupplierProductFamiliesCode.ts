/* eslint-disable @typescript-eslint/no-explicit-any */
import { Factory, Seeder } from "typeorm-seeding";
import { DataSource, Like } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { SupplierProductFamilyModel } from "@models/SupplierProductFamily";

import * as fs from "fs"; 
import { dirname, resolve } from "path";
import _ from "lodash";

export default class AddSupplierProductFamiliesCode implements Seeder {

	private readMapFile(): string{
		const rootDir = resolve(dirname(require.main.filename) + "/../../../");
		const mapsDir = rootDir + "/src/seeds/.maps/";

		const fileContent = fs.readFileSync(mapsDir + "supplierProductFamiliesCode.txt", {
			encoding: "utf-8"
		});

		return fileContent;
	}

	private loadCodes(): Array<object>{
		const map = this.readMapFile().split("\n");
		const mapData = [];
		const regexParse = /^([a-zA-Z0-9\s\u00C0-\u017F/´`.&+:()’-]+)-[\s]*([fF][0-9]{5})[\s]*[_]*[0-9]{1,4}[_]*[\s]*[a-zA-Z]{3}/;

		_.forEach(map, (item) => {
			const parseItem = regexParse.exec(item);
			const familyName = parseItem[1].trim();
			const familyCode = parseItem[2].trim();

			mapData.push({
				name: familyName,
				code: familyCode,
			});
		});

		return mapData;
	}

	public async run(factory: Factory, datasource: DataSource): Promise<any> {
		const supplierProductFamilyModel = new SupplierProductFamilyModel();
		const map = this.loadCodes();

		for(const objProductFamily of map) {
			objProductFamily["original_name"] = objProductFamily["name"];

			// Replace text
			_.forEach({
				"ABRAÇADTIPO D C/PARAFUSO": "ABRAÇADEIRA TIPO D C/PARAFUSO",
				"ABRAÇAD TIPO U VERGALHÃO": "ABRAÇADEIRA TIPO U",
				"ACESSORIO P/CX ACOPLADA": "ACESSORIO P/CAIXA ACOPLADA",
				"ACOPLAMENT P/EXTENÇ GEW": "ACOPLAMENTO P/EXTENÇAO GEWISS",
				"ACOPLAMENTO P/EXTENÇ JNG": "ACOPLAMENTO P/EXTENÇAO JNG",
				"ACOPLAMENT P/EXTENÇ STECK": "ACOPLAMENTO P/EXTENÇAO STECK",
				"ADAPTADOR BALLOM": "ADAPTADOR",
				"ADAPTADOR CABO T /IMPACTO": "ADAPTADOR CABO T / IMPACTO",
				"ADAPTADOR P/LAMP TUBOLED": "ADAPTADOR P/ LÂMPADA",
				"AGUA RAZ": "AGUARRAZ",
				// "ALCOOL GEL": "",
				"ALICATE P/NIVELAR PISO/AZULEJ": "ALICATE P/NIVELAR PISO E AZULEJO _ ACESS",
				// "ALICATE PUNCIONADOR": "",
				"ALICATE REBITADOR PROFISS": "ALICATE REBITADOR PROFISSIONAL",
				"ALICATE UNIVERSAL PROFISS": "ALICATE UNIVERSAL PROFISSIONAL",
				"ANTI-MOFO": "ANTI-UMIDADE",
				// "ARCO DE PUA": "",
				// "AUXILIAR DE PARTIDA": "",
				// "BANQUETA AÇO E PLASTICA": "",
				// "BARRAMENTO PHAYNELL": "",
				"BOIA CAIXA D’AGUA": "BOIA  CAIXA DAGUA",
				"BOIA CX D’AGUA VAZAO TOTAL": "BOIA CAIXA D AGUA VAZAO TOTAL",
				"BOLSA/COLETE P/FERRAMENT": "BOLSA E COLETE P/FERRAMENTAS",
				"BOTINA COURO ELAST BIQ.AÇ": "BOTINA DE COURO ELASTICO BIQ.AÇO",
				"BOTINA NOBUC CAD. BIQ.PVC": "BOTINA DE NOBUCK CADARÇO BIQ.PVC",
				"BOX": "",
				// "BROCA AÇ RAP. ALTA PERFORM.": "BROCA AÇO RAPIDO ALTA PERFORMANCE DEWALT",
				// "BROCA CHATA P/MADEIRA": "",
				"BROCA WIDEA SDS-PLUS DEW": "BROCA WIDEA SDS-PLUS DEWALT",
				"BROCA WIDEA SDS-PLUS HAM": "BROCA WIDEA SDS-PLUS HAMMER",
				"BUCHA FIXAÇ DRYWALL NYLON": "BUCHA DE FIXAÇÃO DRYWALL NYLON",
				"BUCHA FIXAÇ P/TIJOLO FURAD": "BUCHA DE FIXAÇÃO P/TIJOLO FURADO",
				"BUCHA FIXAÇ PLASTIC P/GESS": "BUCHA DE FIXAÇÃO PLASTICA P/GESSO",
				"BUCHA FIXAÇ DRYW TAB/SFORB": "BUCHA DE FIXAÇÃO DRYWALL TAB/SFORBOLT",
				// "BUCH FIXAÇ DRYW NYLON BUR": "",
				// "BUCH FIXAÇ DRYW NYLON OCO": "",
				"CABO/EXTENS P/CAVAD. TRAD": "CABO E EXTENSÃO P/ CAVADEIRA TRADO",
				"CABO FORÇA T & EXTENS P/SOQ": "CABO FORÇA T _ EXTENSÃO P/SOQUETE",
				"CX LUZ CHAPA PADR ELETROP": "CAIXA LUZ CHAPA PADRAO ELETROPAULO",
				"CX LUZ CHAP PADR BAND/CPFL": "CAIXA LUZ CHAPA PADRAO BAND/CPFL",
				"CX LUZ MONT CHAP/POLICAR": "CAIXA LUZ MONTADA CHAPA/POLICARBONATO",
				"CX P/GORD C/CESTA LIMPEZA": "CAIXA P/GORDURA C/CESTA LIMPEZA",
				// "CAIXA P/HIDROMETRO": "",
				"CAIXA PASSAG DE ALUMINIO": "CAIXA PASSAGEM DE ALUMINIO",
				"CX E COROA SISTEMA PERFUR": "CAIXINHA E COROA SISTEMA PERFURAÇAO",

				/* @TODO */
				// "ABRA_AD TIPO D %CUNHA": "",
				// "ACABAMENT %VALV DESCARG": "",
				// "ADESIV%MANTA LAMINA %REP": "",
				// "ALCOOL GEL": "",
				// "ALICATE PUNCIONADOR": "",
				// "ARANDELA COLONIAL": "",
				// "ARCO DE PUA": "",
				// "ASSENTO %BACIA ALMOFAD": "",
				// "AUXILIAR DE PARTIDA": "",
				// "BANQUETA A_O E PLASTICA": "",
				// "BARRAMENTO PHAYNELL": "",
				// "BATERIA %MAQUINAS": "",
				// "BOTINA COURO ELAST BIDENS": "",
				// "BROCA A_ RAP. ALTA PERFORM.": "",
				// "BROCA CHATA %MADEIRA": "",
				// "BROCA WIDEA SDS-PLUS MAK": "",
				// "BUCHA FIXA_ %TIJOLOsFURADO": "",
				// "BUCH FIXA_ DRYW NYLON BUR": "",
				// "BUCH FIXA_ DRYW NYLON OCO": "",	"CAIXAsESGOTO POLIPROP EsACESS_RIO": "",
				// "CAIXAsLUZ CHAPA PADR ELETROP": "",
				// "CAIXAsLUZ CHAP PADR BAND%CPFL": "",
				// "CAIXAsLUZ MONT CHA%POLICAR": "",	"CAIXA %EXTINTOR INCENDIO": "",
				// "CAIXAs%GORD %CESTA LIMPEZA": "",
				// "CAIXA %HIDROMETRO": "",
				// "CAIXAsE COROA SISTEMAsPERFURA__O": "",
				// "CAIXAsLUZ %GESSO%DRYWAL": "",	"CALHA DE PVC EsACESS_RIO": "",
				// "CALHA GALVANIZ EsACESS_RIO": "",
				// "CAMPAINHA DIN-DON MUSIC": "",
				// "CAMPAINHAS INDUSTR DENE": "",
				// "CANETA MARCA_ PERMANENT": "",
				// "CANETA ESFEROGR CRISTAL": "",
				// "CANTONEIRA %FIXAC MOVEIS": "",	"CAPA DE CHUVA %MOTOQU": "",
				// "CAPACETE SEGURAN_%ACESS": "",
				// "CARREGADOR % CELULAR": "",
				// "CARRINHO CARGA SOBE ESCAD": "",
				// "CARRINHO HIDRAULICO": "",
				// "CATRACA REVERSIVEL %SOQU": "",
				// "CENTRINHO DE PVC %DISJ": "",
				// "CENTRINHO %AR CONDIC": "",	"CESTINHA % VALV AMERIC": "",
				// "CHAVE BIELA FERTAK % IMA": "",
				// "CHAVE CANH_O TRAMONT": "",
				// "CHAVE COMB CATRACADA EDA": "",
				// "CHAVE COMBINAD TRAMONT": "",	"CHAVE FENDA%PHILLIPS TOCO": "",
				// "CHAVE FACA": "",
				// "CHAVE MULTIUSO %CX ACOPL": "",	"CHAVE SOQU WAFT TORX LONG": "",
				// "CHUVEIRO FRIO INOX": "",	"CILINDRO %CADEADO PORTA A_": "",
				// "CINTA %CATRACA %AMARRA_": "",
				// "CINTO SEGURAN_A &sACESS_RIO": "",
				// "CONJUNTOsILUMI MOVEIS SLIM BR": "",
				// "CONJUNTOsPARAF %ASSENTO": "",
				// "CLORO": "",
				// "COLA ADESIVA %JUNTA MOTOR": "",	"COLA SELANTE DE POLIURET": "",
				// "COLA TRAVA-ROSCA ANAEROB": "",	"CONDU_TE CORRUG AM%LAR": "",
				// "CONDU_TE CORRUGADO PTO": "",
				// "CONDU_TE FLEX. ESPIRALAD": "",
				// "CONDULETE EsACESS_RIO DE ALUM": "",
				// "CONDULETE EsACESS_RIO DE PVC": "",
				// "CONECTOR AUTOMAT % FIOS": "",
				// "CONECTOR DERIVA_sPERFURAÇ_O": "",
				// "CONECTOR LUVA COMPRESS": "",
				// "CONECTOR %INTERLIG STECK": "",
				// "CONECTOR RAP %CABO SOLDA": "",
				// "CONECTORsSPLIT BOLT COBR%LAT": "",
				// "CONEX_O%ACESS %HIDRANTE": "",
				// "CONEX_ES AZUL %MANG": "",	"CONEXOES INFRA-EXTR CORRP": "",
				// "CONEXOES PRETA %MANGU": "",
				// "CONJUNT MARGIRUS SLEEK BR": "",
				// "CONJUNTO PERLEX": "",
				// "CONJUNTO PIAL": "",
				// "CONJUNTOsRADIAL MOD PEROLA BR": "",
				// "CONJUNTOsRADIAL MOD PEROLA PT": "",
				// "CONJUNTO TRAMONT LUX2": "",
				// "CONTATOsRELE TERM CONTATO": "",	"CONVERSOR TV CABO%DIGITAL": "",
				// "CONVERT E REMOVED FERRUG": "",
				// "CORDA TRANC POLIAM T:BOMB": "",
				// "CORDA TRANC POLIET %SINALIZ": "",
				// "CORDA TRANC POLIEST CARR": "",
				// "CORDA TRANC POLIPR CARRET": "",
				// "CORDA TRANC POLIEST CARR.": "",
				// "CORD_O % FERRO": "",
				// "CORD_O % GRAVADOR": "",	"CORTADOR CHAP %FURAD%ACES": "",
				// "CORTADOR PISO%AZ ELETRICO": "",
				// "CREMONA": "",	"CURVA % ELETRODUTO PVC": "",
				// "CURVA % ELETROD ZINCADO": "",
				// "DESEMPENADEIRAsPVCsGESSOO%TEXTURA": "",
				// "DESEMPENADEIRAsDE ACO CASTOR": "",
				// "DESEMPENADEIRA MADEIRA": "",
				// "DESEMPENADEIRA MADEIRITE": "",
				// "DESEMPENADEIRA PVC AZUL": "",
				// "DESEMPENADEIRAsPVC %BORRACHA": "",
				// "DESEMPENADEIRAsPVC %ESPUMA": "",
				// "DESEMPENAD DE PVC PRETA": "",
				// "DISCO LIXA %MARM%GRANITO": "",	"DISCO DIAMANT PORCELANAT": "",
				// "DISJUNTORES A UNIP DIN": "",
				// "DISJUNTORES A UNIP NEMA": "",
				// "DISJUNTORES B BIP DIN": "",
				// "DISJUNTORES B BIP NEMA": "",
				// "DISJUNTORES C TRIP DIN": "",
				// "DISJUNTORES C TRIP NEMA": "",
				// "DISPOSITIVO PROTE_ SURTO": "",
				// "DOBRADI_A BIEHL": "",
				// "DOBRADI_A PRESS %MOVEIS": "",	"DOBRADI_A SILVANA (BLISTER)": "",
				// "DOBRADI_A SILVANA (CAIXA)": "",
				// "DRIVE E CONTR %LAMP LED": "",
				// "DUCHA HIGIENICA EsACESS_RIO": "",
				// "ELETRODUTO PVC": "",	"ENGATE E EMENDA %MANG": "",
				// "ESCOVA A_O %CABO E S%CABO": "",
				// "ESMALTE SINT EUCALAR 1%16": "",
				// "ESMALTE SINT EUCALAR 1%4": "",
				// "ESMALTE SINT EUCALAR GL": "",	"ESMALTE SINT EUCALUX 1%4": "",
				// "ESMALTE SINTET EUCALUX GL": "",
				// "ESMALTE SINT LUKSCOL 1%16": "",
				// "ESMALTE SINT LUKSCOLOR 1%4": "",
				// "ESMALTE SINT LUKSCOLOR GL": "",
				// "ESPELHO % PISO METAL": "",	"ESTANTE": "",
				// "EXTENSOR % ROLO PINTURA": "",
				// "FECHADURAsELETR_NICA E ELETR": "",
				// "FECHADURA KIT SEGURAN_A": "",
				// "FECHADURA LN": "",	"FILTRO LINHA S%FIO": "",
				// "FILTRO %BEBEDOUR-ACESS": "",
				// "FILTRO %CX DAGUA EsACESS_RIO": "",
				// "FIO CABO AUTO METRO": "",	"FIO CABO FLEX PP METRO": "",
				// "FIO DE NYLON %CORT GRAMA": "",
				// "FIO TORCIDO": "",	"FITA LED": "",	"FRIZO % PORTA": "",
				// "FUNDO PIGMENT %sGESSOO": "",
				// "FURADEIRA%PARAFUSAD KIT": "",	"GLOBO VIDRO": "",
				// "GRAMPEADOR &sACESS_RIOORIOS": "",
				// "GRAMPO %MARC SARGENTO": "",
				// "GRAMPO %MARCENEIR TIPO C": "",	"GRELHA ALUM %CX COLETOR": "",
				// "GRELHA DE ALUM COMPLETA": "",
				// "GRELHA DE ALUM E PLASTICA": "",
				// "IMPERMEABILIZ NOVA TINTA": "",
				// "IMPERMEABILIZANTEsOTTO BAUMGART": "",
				// "IMPERMEABILIZ QUARTZOLIT": "",	"JANELA DE ALUMINIO": "",
				// "JOELHEIRA %ASSENTAM PISOS": "",
				// "JOGO CHAVE ALLEN ABAULADA": "",
				// "JOGO DE CHAVE ESTRELA": "",
				// "JOGO CHAVE FENDA&PHILLPS": "",
				// "JOGO DE CHAVE INTERCAMBIAV": "",	"JUNTA UNIVERSAL %SOQU": "",
				// "KANTINHO": "",
				// "KIT BARRAMENTO OLIPE": "",	"L_MPADA COMP ESPIRAL MINI": "",
				// "L_MPADA COMP FLOURESC": "",
				// "L_MPADA COMPACTA MINI": "",
				// "L_MPADA FLUORESCENTE": "",
				// "L_MPADA INCÂND ECOLOGEN": "",
				// "L_MPADA REFIL CIRCULAR": "",
				// "L_MPAD SUPER LED BOLINHA": "",
				// "L_MPADA SUPER LED DICR_IC": "",	"L_MPADAsSUPER LED HIGH POWER": "",
				// "L_MPADAsSUPER LED MINI DICR_IC": "",
				// "L_MPADA VAPOR MERC_RIO": "",
				// "L_MPADA VAPOR METAL": "",
				// "LAMPIAO LED RECARREGAVEL": "",	"LIMPA LAMINAD%PEDR/PORCEL": "",
				// "LIXA MICROFINA": "",	"LOU_AS EsACESS_RIOsACESSÓRIOIBILID": "",
				// "LUMIN_RIAsESPETO %JARDIM": "",
				// "LUMIN.ESPETO %JARD %LEDS": "",
				// "LUMIN_RIAsALET REFLET %TUBOLED": "",
				// "LUMIN_RIAsALET.%LAMP COMPACT": "",
				// "LUMIN_RIAsALETADA REFLETORA": "",
				// "LUMIN_RIAsLED LINEAR ALETADA": "",
				// "LUMIN_RIAsDE LED LUZ NOTURNA": "",
				// "LUMIN_RIAsDE LED SLIM EMBUTIR": "",
				// "LUMIN_RIAsDE LED SLIM RETANG": "",
				// "LUMIN_RIAsLED SLIM SOBREPOR": "",
				// "LUMIN_RIA LED ALETADA": "",	"LUMINARIA SOLAR": "",
				// "LUVA DE LATEX FORRADA": "",
				// "LUVA MALHA TRICOT BLUEGRIP": "",
				// "LUVA MALHA TRICOT EMBORR": "",
				// "LUVA MALHA TRICOTADA LISA": "",
				// "LUVA MALHA TRICOT PIGMENT": "",
				// "LUVA % CONDUITE CORRUG": "",
				// "LUVA SOLDAV CORRER MARR": "",	"MA_ARICO &sACESS_RIOORIOS": "",
				// "MANGUEIRAsFLUTUANTE %PISCINA": "",
				// "MANGUEIRA G_S EsACESS_RIO": "",	"MANGUEIRA TRAN_AD CONJ": "",
				// "MANTA PROTETORA": "",
				// "MAQUINA DE SOLDA EsACESS_RIO": "",
				// "MARTELO AZULEJISTA": "",
				// "MARTELO CARPINT CAB FIBRA": "",
				// "MARTELO CARPINT CAB METAL": "",
				// "MARTELO CARPINT PINTADO": "",
				// "MARTELO CARPINT POLIDO": "",
				// "MASCARA %SOLDA %ESCUREC": "",	"MASCARA %SOLDA EsACESS_RIO": "",
				// "MASCARA PROTET %VALVULA": "",
				// "MATA BARAT%FORMIG/RAT/CUP": "",
				// "MESA E CADEIRA ACO%MDP": "",
				// "MIGUEL_O E FIXA CABOS": "",	"MULTIMETRO &sACESS_RIOORIOS": "",
				// "NICHO": "",
				// "_CULOS SEG AMPLA VISAO": "",
				// "_CULOS SEGURAN_ JAMAICA": "",
				// "_CULOS SEGURAN_A PANDA": "",
				// "_CULOS SEGURAN_A VENEZA": "",
				// "_CULOS SEG LEOP SUMM SLIM": "",
				// "_CULOS SEG 2EM1 ANT.VIBRA_": "",
				// "_CULOS SEG JAGUAR SKY%STAR": "",	"PAPEL HIGIEN%TOALH SABONET": "",
				// "PARAFUSOs%DRYW. TROMB%AGULH": "",
				// "PARAFUSOsAUTO ATARR. PHILIPS": "",	"PARAFUSO LAT_O % VASO": "",
				// "PARAFUSOsLATON % VASO-TANQU": "",
				// "PARAFUSOs%DRYWALL AGULHA": "",
				// "PARAFUSOs%DRYWALL BROCANTE": "",
				// "PARAFUSOsSEXTAV. ROSCA SOBERBA": "",
				// "PENDENTE DECORATIV ALUM": "",
				// "PENDENTE DECORATIV VIDRO": "",	"PERFIL %DRYWALL EsACESS_RIO": "",
				// "PINO ADAP %INT.LIGA%DESLIG": "",	"PLACA ACRILICA": "",
				// "PLACA %DRYWALL EsACESS_RIO": "",
				// "PONTEIRA ANCORA PHILLIPS": "",	"PORTA DE ALUMINIO BALC_O": "",
				// "PORTA GRELHA (FERRO FUND)": "",
				// "PORTAO DOMESTICO &sACESS_RIO": "",
				// "PRATELEIRA MULTIUSO BANH": "",	"PREGO POLIDO GERDAU": "",
				// "PRENSA CABO GEWISS": "",
				// "PRESSURIZADOR %CX DAGUA": "",
				// "PRODUTOS %MANUT PISCINA": "",
				// "PROLONGADORs% BARRA ROSQU": "",
				// "PROLONGADORs%CX SIF MULTIPLA": "",
				// "PULVERIZADOR DE COMPRESS": "",	"QUADRO %BARRAM NOFUSE": "",
				// "QUADRO %BARR %DISJUNTOR": "",
				// "QUADRO MONT DISTRIB CHINT": "",
				// "QUADRO PVC %BARR %DISJ": "",
				// "QUADRO S%BARR %DISJ": "",	"REATOR INTRAL VAPOR METALI": "",
				// "REGISTRO ESFERA PVC ROSCAV": "",
				// "REGISTRO ESFERA PVC SOLDAV": "",
				// "REGUA DE ALUMINIO LISA": "",
				// "REJUNTE INDEFLEX": "",	"REPAROS CX LUZ (SALVA CX.)": "",
				// "REPELENTE %PERNILONGOS": "",
				// "REPETIDOR%ROTEAD WIRELES": "",
				// "RESIST_NCIA %TORN EL_TRIC": "",
				// "RODIZIO": "",
				// "RODO ABSORVENTE &sACESS_RIO": "",
				// "RODO ALUM%MADEIRA/PLASTIC": "",
				// "ROLDANA FERRO FUND.%PO_O": "",
				// "ROLO ADESIVO TIRA PELO": "",	"SAPATO COMFORT ANTI-DERR": "",
				// "SAPATO COURO ELAST BIDENS": "",
				// "SENSOR PRESEN_ %SOQU E-27": "",	"SIFAO SANFONADO CROMAD": "",
				// "SINALIZADOR %GARAG %LED": "",	"SOQUETE MAGNETICO %PARAF.": "",
				// "SOQUETE %LAMP DICROICA": "",
				// "SOQUETE WAFT ESTRIAD LONGO": "",
				// "SOQUETE WAFT IMPACT CURTO": "",
				// "SOQUETE WAFT IMPACT LONGO": "",	
				// "SPOT EMBUTIR %SOQUET E-27": "",
				"SPRAY CHEMICOLOR": "TINTA SPRAY CHEMICOLOR",
				"SPRAY CIBRA COLOR": "TINTA SPRAY CIBRA COLOR",
				"SPRAY COLORGIN": "TINTA SPRAY COLORGIN",
				"SPRAY PAINT COLOR": "TINTA SPRAY PAINT COLOR",
				// "SUPORT %GARRAF-BOMB MAN": "",	"TABUA DE PASSAR EsACESS_RIO": "",
				// "TAMPA %LAVAT- PIA - TANQU": "",
				// "TARRACHA": "",
				// "TEE LAT_O": "",
				// "TELAsAMARRA__O %ALVENARIA": "",
				// "TELA GALV. %REFOR_O FACHAD": "",
				// "TELA MOSQUIT EM POLYESTER": "",	"TELHA": "",
				// "TELHA FIBRA%POLIPROP EsACESS_RIO": "",
				// "TELHA PVC": "",
				// "TESOURA FUNILEIR TIP AVIA__O": "",	"TINGIDOR UNIVERSAL": "",
				// "TINTA ACRILIC PISO EUCATEX": "",
				// "TINTA ACRLIC PISO LUKSCOL": "",
				// "TOMADA EM BARRA": "",
				// "TOMADA SOBREP JNG INDUSTR": "",
				// "TOMADA SOBR STECK INDUSTR": "",
				// "TORNEIRA 1%4 VOLTA EMA MET": "",
				// "TORNEIRA 1%4 VOLTA FURKIN": "",
				// "TORNEIRA 1%4 VOLTA HIGIBAN": "",
				// "TORNEIRA 1%4 VOLTA ONEEL": "",
				// "TORNEIRAs1%4 VOLTA/MATIC HOSPIT": "",
				// "TORNEIRA B. MOVEL %FILTRO": "",
				// "TORNEIRA CROM LAVATORIO": "",
				// "TORNEIRA MAQU DE LAVAR": "",
				// "TRENA DE BOLSO EMBORRACH": "",	
				// "TUBO DRENAGEM &sACESS_RIO": "",
				// "TUBOS-CONEX AQUATH": "",
				// "TUBOS E CONEXOES PPR": "",
				// "VALVULA INOX%METAL LAVAT": "",	
				"VEDAROSCA": "VEDA ROSCA",
				// "VENTILAD COLUNA%PEDESTAL": "",
				// "VERNIZ SPARLACK IPIRANGA": "",
			}, (toReplace, keyReplace) => {
				if (objProductFamily["name"] == keyReplace) {
					objProductFamily["name"] = toReplace;
				}
			});

			// Replace regex
			_.forEach({
				"/^CX[.]{0,1}\\s/": "CAIXA ",
				"/^CJ[.]{0,1}\\s/": "CONJUNTO ",
				"/^CONECT[.]{0,1}\\s/": "CONECTOR ",
				"/^CONTAT[.]{0,1}\\s/": "CONTATO ",
				"/^DESEMP[.]{0,1}\\s/": "DESEMPENADEIRA ",
				"/^FECHAD[.]{0,1}\\s/": "FECHADURA ",
				"/^IMPERMEAB[.]{0,1}\\s/": "IMPERMEABILIZANTE ",
				"/^LÂMP[.]{0,1}\\s/": "LÂMPADA ",
				"/^LUMIN[.]{0,1}\\s/": "LUMINÁRIA ",
				"/^MANG[.]{0,1}\\s/": "MANGUEIRA ",
				"/^PARAF[.]{0,1}\\s/": "PARAFUSO ",
				"/^PROLONG[.]{0,1}\\s/": "PROLONGADOR ",
				"/^TORN[.]{0,1}\\s/": "TORNEIRA ",

				"/\\sACESS[.]{0,1}/": " ACESSÓRIO",
				"/\\sAMARRAÇ[.]{0,1}/": " AMARRAÇÃO",
				"/\\sFURAD[.]{0,1}/": " FURADO",
				"/\\sGESS[.]{0,1}/": " GESSO",
				"/\\sPERFUR[.]{0,1}/": " PERFURAÇÃO",
			}, (toReplace, keyReplace) => {
				const regexFind = new RegExp(keyReplace.substring(1, keyReplace.length-1), "isg");

				objProductFamily["name"] = objProductFamily["name"].replace(regexFind, toReplace);
			});

			// Like operators
			_.forEach({
				"Á": "_",
				"É": "_",
				"Í": "_",
				"Ó": "_",
				"Ú": "_",
				"À": "_",
				"È": "_",
				"Ì": "_",
				"Ò": "_",
				"Ù": "_",
				"Â": "_",
				"Ê": "_",
				"Î": "_",
				"Ô": "_",
				"Û": "_",
				"Ã": "_",
				"Ẽ": "_",
				"Ĩ": "_",
				"Õ": "_",
				"Ũ": "_",
				"Ç": "_",
				"`": "_",
				"´": "_",
				"’": "_",
				".": "%",
				"P/": "%",
				"C/": "%",
				"/": "%",
				// "DAGUA": "D%AGUA",
			}, (toReplace, keyReplace) => {
				objProductFamily["name"] = objProductFamily["name"].replace(keyReplace, toReplace);
			});

			objProductFamily["name_with_operators"] = "%" + objProductFamily["name"].split(" ").join("%") + "%";

			// const findFamily = await supplierProductFamilyModel.findOne({ 
			// 	where: [
			// 		{
			// 			"supplier_id": Like("eletroleste"), 
			// 			"name": Like(objProductFamily["name"]),
			// 		},
			// 		{
			// 			"supplier_id": Like("eletroleste"), 
			// 			"name": Like(objProductFamily["original_name"]),
			// 		},
			// 		{
			// 			"supplier_id": Like("eletroleste"), 
			// 			"name": Like(objProductFamily["name_with_operators"]),
			// 		},
			// 	]
			// });

			let findFamily = await supplierProductFamilyModel.findOne({ 
				where: {
					"supplier_id": Like("eletroleste"), 
					"name": Like(objProductFamily["original_name"]),
				},
			});

			if (! findFamily) {
				findFamily = await supplierProductFamilyModel.findOne({ 
					where: {
						"supplier_id": Like("eletroleste"), 
						"name": Like(objProductFamily["name"]),
					},
				});
			}

			if (! findFamily) {
				findFamily = await supplierProductFamilyModel.findOne({ 
					where: {
						"supplier_id": Like("eletroleste"), 
						"name": Like(objProductFamily["name_with_operators"]),
					},
				});
			}

			if (! findFamily) {
				console.log("@Not found:", objProductFamily["original_name"], "|", objProductFamily["name"]);
			} else {
				await supplierProductFamilyModel.update({ id: findFamily["id"] }, {
					code: objProductFamily["code"]
				});
			}
		}
		// await datasource
		// 	.createQueryBuilder()
		// 	.insert()
		// 	.into(/* Entity */)
		// 	.values(/* EntityData[] */ as QueryDeepPartialEntity</* Entity */>[])
		// 	.orIgnore("(\id\) DO NOTHING")
		// 	.execute();
	}
}
