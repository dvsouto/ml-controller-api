const brands = [
	"3M",
	"3R",
	"AC VENT",
	"AÇOMIX",
	"ACP",
	"ACQUA MIL",
	"ACQUAFLEX",
	"ACRILON",
	"ACRILUS",
	"ADELBRAS",
	"ADELMETAIS",
	"ADTEX",
	"AE PLAST",
	"AFA",
	"AFORT",
	"AGELUX",
	"AIEDEM",
	"AJ RORATO",
	"ALGE",
	"ALIANCA",
	"ALLTAPE",
	"ALMA TEXTIL",
	"ALPHA BEST",
	"ALULEV",
	"ALUMASA",
	"ALUMBRA",
	"ALUREM",
	"AM METAIS",
	"AMANCO",
	"AMANCO",
	"AMAZONAS",
	"AMERICAN",
	"ANAUGER",
	"ANCORA",
	"ANURB",
	"APEX",
	"AQUAPLAS",
	"ARCELOR MITTAL",
	"ARCOBRAS",
	"ARCOIR",
	"ARCOM",
	"ARFO",
	"ARPEX",
	"ARRUELA FREITAS & SILVA",
	"ART METAIS",
	"ART VARAL",
	"ARTBOR",
	"ARTOCH",
	"ARTPLAS",
	"ASFOR",
	"ASTOPACK",
	"ASTRA",
	"ATCO",
	"ATLAS",
	"BALMER",
	"BAMBU",
	"BASTON",
	"BELLOSA",
	"BELZER",
	"BERTOLO",
	"BEZELUX",
	"BIC",
	"BIEHL",
	"BIKI",
	"BLACK & DECKER",
	"BLUKIT",
	"BLUMENAU",
	"BMP ELASTICOS",
	"BN",
	"BOGNAR",
	"BOSCH",
	"BRASCAMP",
	"BRASCOLA",
	"BRASCOM",
	"BRASFORMA",
	"BRASFORT",
	"BRASILIA",
	"BRASILIT",
	"BRASIPLAST",
	"BRASLIDER",
	"BRILIA",
	"BRONZEARTE",
	"BRUM",
	"C.S.M",
	"CABOS ANTUNES",
	"CALHA FORTE",
	"CANIELLO",
	"CAPTE",
	"CARMAX",
	"CASTELO",
	"CASTOR",
	"CEBEL",
	"CELITE",
	"CEMAR",
	"CENSI",
	"CEROCHA",
	"CHERUBINO",
	"CHEMICOLOR",
	"CHIES",
	"CHIVA",
	"CHURRABEM",
	"CIBRA",
	"CIFARELLI",
	"CIMPLEX",
	"CKW",
	"CLARINOX",
	"CMK ARRUELAS",
	"COBIX",
	"COBRECOM",
	"COLIGAS",
	"COLORGIN",
	"COLSON",
	"COMPEL",
	"CONDLIGHT",
	"CONDOR",
	"CONFIBRA",
	"CONTEL",
	"COPIMAX",
	"COROA",
	"CORONA",
	"CORR PLASTIK",
	"CORTAG",
	"CR FERRAMENTAS",
	"CRIVAL",
	"CSK",
	"DAISA",
	"DANEVA",
	"DANTAS",
	"DANVAL",
	"DARTHEL",
	"DECA",
	"DECORALITA",
	"DECORE",
	"DEGOMASTER",
	"DEPLAST",
	"DEPLASTI",
	"DEWALT",
	"DEXTER",
	"DEZCOMP",
	"DIAMAN BEARS",
	"DICARLO",
	"DISFLEX",
	"DLUCCA",
	"DNI",
	"DOIS IRMAOS",
	"DOMLINE",
	"DRYKO",
	"DUMON",
	"DURACELL",
	"DYSTRAY",
	"ECO",
	"ECOCONVERT",
	"ECONOMAX",
	"ECP",
	"EDA",
	"EDUS",
	"ELECON",
	"ELESYS",
	"ELETRO ARR",
	"ELETRO SALVADOR",
	"ELGIN",
	"ELITE",
	"ELITE",
	"EMA",
	"EMAVAH",
	"EMAVE",
	"EMAVI",
	"EMBRASTEC",
	"ENERGYRUS",
	"ENGESIG",
	"ESFERA",
	"ESTOPAS PAULICEIA",
	"ESTRELA",
	"EUCATEX",
	"EXATRON",
	"EZT",
	"FABER CASTELL",
	"FABRINOX",
	"FAMASTIL",
	"FAME",
	"FC FIOS E CABOS",
	"FCDOIS",
	"FENIX",
	"FERCAR",
	"FERE",
	"FERRARI",
	"FERROX",
	"FERTAK",
	"FIRLON",
	"FIRMEZA",
	"FISCHER",
	"FIX",
	"FJ FERRAMENTAS",
	"FLASH LIMP",
	"FORCE LINE",
	"FORSAN",
	"FORTLEV",
	"FOXLUX",
	"FUNDICAO REIS",
	"FURKIN",
	"FUZETTO",
	"GALAXY LED",
	"GALO",
	"GARDEN",
	"GARIN",
	"GARONE",
	"GEMINNI",
	"GENEBRE",
	"GERDAU",
	"GERMER",
	"GEWISS",
	"GHEL PLUS",
	"GIANFLEX",
	"GLOBALMIX",
	"GOLD",
	"GOMES GARCIA",
	"GOODYEAR",
	"GRENDENE",
	"GTRES",
	"GUARANY",
	"HAMMER",
	"HAYNER",
	"HDL",
	"HENKEL",
	"HERC",
	"HIDROAZUL",
	"HIDROFILTROS",
	"HIDROLAR",
	"HIGIBAN",
	"HYDRA",
	"IBERE",
	"IBIRA",
	"ICF FERRARI",
	"ILUMATIC",
	"ILUMI",
	"IMA",
	"IMAGEVOX",
	"IMAR",
	"IMARC",
	"IMC",
	"IMPERATRIZ",
	"INCA",
	"INCEPA",
	"INDEFLEX",
	"INJESUL",
	"INOVE",
	"INTELBRAS",
	"INTELLI",
	"INTERNEED",
	"INTRAL",
	"IRRIGATEC",
	"IRWIN",
	"ITAMBE",
	"ITAQUA",
	"IV PLAST",
	"J. R. ILUMINAÇÃO",
	"J. RAU",
	"JAL",
	"JF ARTEFATOS",
	"JF METAIS",
	"JIMO",
	"JNG",
	"JOLLY",
	"JOMARCA",
	"JOMARCA",
	"JOMARCA",
	"JR PLASTICOS",
	"JUNTALIDER",
	"KALIPSO",
	"KARIMEX",
	"KCC",
	"KHRONOS",
	"KIAN",
	"KING STEEL",
	"KITUBOS",
	"KRODEC",
	"L A MARTINS",
	"L.STREFEZZA",
	"LBM",
	"LED BEE",
	"LG STEEL",
	"LINHAL",
	"LM",
	"LOGASA",
	"LOMBARD",
	"LONAX",
	"LORD",
	"LORENZETTI",
	"LOTH",
	"LOYAL",
	"LUBIAN",
	"LUCONI",
	"LUKSCOLOR",
	"LUMEPETRO",
	"LUMIBRAS",
	"LUNAR LUX",
	"LUX TELHAS",
	"LUXTIME",
	"MAC LOREN",
	"MACTRA",
	"MADEX",
	"MAGNET",
	"MAJESTIC",
	"MAKITA",
	"MANLUPLAST",
	"MARCAI",
	"MARGIRIUS",
	"MARTIN",
	"MASSTER",
	"MASTIFLEX",
	"MAX CHAMAS",
	"MAX FERRAMENTAS",
	"MAX RODO",
	"MAXEB",
	"MAXI RUBBER",
	"MAXICAIXA",
	"MEGATRON",
	"METALMIX",
	"METASUL",
	"MGM MÓVEIS",
	"MIL BOLHAS",
	"MINASUL",
	"ML CADEADO",
	"MOLDIMPLAS",
	"MOMFORT",
	"MOR",
	"MORIA",
	"MORAES LUVAS",
	"MORETZSOHN",
	"MORLAN",
	"MORUMBI",
	"MS",
	"MTX",
	"MULTI-BARRAS",
	"MULTIBOX",
	"MULTICABOS",
	"MULTICRAFT",
	"MULTIFIX",
	"MULTILASER",
	"MULTIVISAO",
	"MUNDIAL PRIME",
	"NAGIO METAL",
	"NAMBEI",
	"NATIBI",
	"NATICON",
	"NATRIELLI",
	"NAUTIKA",
	"NEGRINE",
	"NETTENTEC",
	"NEW FIX",
	"NIKOKIT",
	"NOBEL",
	"NORTENE",
	"NORTON",
	"NOSLIW",
	"NOVA TINTAS",
	"NOVACOR",
	"NOVO HORIZONTE",
	"NOVOFLEX",
	"NSBAO",
	"OBAGAS",
	"ODEM",
	"ODIM",
	"OLICAR",
	"OLIVO",
	"ONEEL",
	"OSRAM",
	"OTTO",
	"OUROLUX",
	"OVERTIME",
	"PACETTA",
	"PADO",
	"PAMPA",
	"PANASONIC",
	"PANDOLFO",
	"PAPAIZ",
	"PEESA",
	"PERFECT",
	"PERFIL LIDER",
	"PERFILAÇO",
	"PERIN",
	"PERLEX",
	"PEROLA",
	"PEXCEL",
	"PHAYNELL",
	"PIAL",
	"PILAR",
	"PILLER",
	"PIMMEL",
	"PINHEIRO",
	"PIX",
	"PLACO",
	"PLANALTO",
	"PLASBOHN",
	"PLASMAR",
	"PLASTAND",
	"PLASTBIG",
	"PLASTILIT",
	"PLASTUBOS",
	"PLUMA",
	"POLIBEL",
	"POLIERG",
	"POLITEX",
	"POLYFITA",
	"POTENCIA MAXIMA",
	"POWER",
	"PRENSAL",
	"PRIMETECH",
	"PROAQUA",
	"PROGERAL",
	"PROSAFETY",
	"PROTEZZA",
	"PULVITEC",
	"QUALIFLON",
	"QUALITRONIX",
	"QUALITY",
	"QUALLY",
	"QUARTZOLIT",
	"RADIAL",
	"RAMOS",
	"RAMPON",
	"RAYCO",
	"RAYCON",
	"RCA",
	"REAL",
	"REAL VIDA",
	"REBITOP",
	"RECICLE",
	"REDY",
	"REISAM",
	"RETOQUE",
	"RIMA",
	"RIPLAS",
	"RISCHIOTO",
	"ROCO",
	"RODCAR",
	"ROLOFLEX",
	"ROMA PINCEIS & ACESSORIOS",
	"RONDON",
	"RRC",
	"SACARIA ZEZINHO",
	"SADOKIN",
	"SANLIMP",
	"SANRO",
	"SANSAO",
	"SANTA CLARA",
	"SANTA MARINA",
	"SANTENO",
	"SANYMETAL",
	"SANYTRADE",
	"SÃO BERNARDO",
	"SÃO RAFAEL",
	"SÃO ROMÃO",
	"SAYERLACK",
	"SCHNEIDER",
	"SCOPO",
	"SECALUX",
	"SEGURIMAX",
	"SENIOR",
	"SERVICENTER",
	"SERVIDAO",
	"SFOR",
	"SIEG",
	"SIFOSUPER",
	"SIKA",
	"SILVANA",
	"SIMETALL",
	"SIMPLAS",
	"SINAL FORTE",
	"SINDAL",
	"SINTEX",
	"SISAL",
	"SMARTER",
	"SOCIOS",
	"SOL",
	"SOLDA",
	"SOLUCOES AMBIENTAIS",
	"SOPRANO",
	"SOPRANO ELETROMETALURGICA",
	"SOUDAL",
	"SOUZA LOPES",
	"SPARLACK",
	"SPARTA",
	"SPG",
	"STAM",
	"STAMACO",
	"STAMPLAC",
	"STARFER",
	"STARRETT",
	"STARTEC",
	"STD HOME",
	"STECK",
	"STEFANI",
	"STILLUS",
	"STONE CUT",
	"STYLE",
	"SUBRAP",
	"SUPER PRATICO",
	"SUZAMPECAS",
	"SWS",
	"SYLVANIA",
	"TAF",
	"TASCHIBRA",
	"TATU",
	"TBR",
	"TECHNA",
	"TECNIBRA",
	"TECNOFUSI",
	"TEE",
	"TEIXEIRA",
	"TEKBOND",
	"TELAS M&M",
	"TENACE",
	"THOMPSON",
	"THR",
	"THUCHAO",
	"TIGRE",
	"TOC",
	"TOLLER",
	"TOP FIO",
	"TOR ALF",
	"TRAMONTINA",
	"TRANSMOBIL",
	"TRAVOFIX",
	"TRIFEL",
	"TRILHA",
	"TRINITY",
	"TUIUTI",
	"TUPY",
	"TURMAN",
	"TUTINOX",
	"ULTRA",
	"ULTRALUB",
	"UNICLAUDIO",
	"UNIFIO",
	"UNIFIX",
	"UNIKAP",
	"UNITEL",
	"UNIVERSAL SERRAS",
	"UNO PLASTIC",
	"UP BOND",
	"UPSAI",
	"VACOFER",
	"VAREX",
	"VEDAH",
	"VEGA",
	"VEJA BEM",
	"VENTI-DELTA",
	"VENTISOL",
	"VICTORIA REGGIA",
	"VILA RICA",
	"VILLEFIX",
	"VIQUA",
	"VITESSE",
	"VJ FIKISS",
	"VONDER",
	"WAFT",
	"WAGO",
	"WALSYWA",
	"WAP",
	"WAVES",
	"WD-40",
	"WSP",
	"ZAMAR",
	"ZB",
	"ZETONE",
	"ZETONE",
	"ZUMPLAST",
];

export {
	brands,
};