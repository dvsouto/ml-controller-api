const toRegex = {
	"a": "[aAáÁàÀâÂãÃ]",
	"b": "[bB]",
	"c": "[cCçÇ]",
	"d": "[dD]",
	"e": "[eEéÉèÈêÊẽẼ&]",
	"f": "[fF]",
	"g": "[gG]",
	"h": "[hH]",
	"i": "[iIíÍìÌĩĨîÎ]",
	"j": "[jJ]",
	"k": "[kK]",
	"l": "[lL]",
	"m": "[mM]",
	"n": "[nN]",
	"o": "[oOóÓòÒôÔõÕ]",
	"p": "[pP]",
	"q": "[qQ]",
	"r": "[rR]",
	"s": "[sS]",
	"t": "[tT]",
	"u": "[uUúÚùÙûÛũŨ]",
	"v": "[vV]",
	"w": "[wW]",
	"x": "[xX]",
	"y": "[yY]",
	"z": "[zZ]",
	"0": "[0][\\s\\.-/]{0,1}",
	"1": "[1][\\s\\.-/]{0,1}",
	"2": "[2][\\s\\.-/]{0,1}",
	"3": "[3][\\s\\.-/]{0,1}",
	"4": "[4][\\s\\.-/]{0,1}",
	"5": "[5][\\s\\.-/]{0,1}",
	"6": "[6][\\s\\.-/]{0,1}",
	"7": "[7][\\s\\.-/]{0,1}",
	"8": "[8][\\s\\.-/]{0,1}",
	"9": "[9][\\s\\.-/]{0,1}",
	"á": "[aAáÁàÀâÂãÃ]",
	"à": "[aAáÁàÀâÂãÃ]",
	"â": "[aAáÁàÀâÂãÃ]",
	"ã": "[aAáÁàÀâÂãÃ]",
	"é": "[eEéÉèÈêÊẽẼ&]",
	"è": "[eEéÉèÈêÊẽẼ&]",
	"ê": "[eEéÉèÈêÊẽẼ&]",
	"ẽ": "[eEéÉèÈêÊẽẼ&]",
	"&": "[eEéÉèÈêÊẽẼ&]",
	"í": "[iIíÍìÌĩĨîÎ]",
	"ì": "[iIíÍìÌĩĨîÎ]",
	"î": "[iIíÍìÌĩĨîÎ]",
	"ĩ": "[iIíÍìÌĩĨîÎ]",
	"ó": "[oOóÓòÒôÔõÕ]",
	"ò": "[oOóÓòÒôÔõÕ]",
	"ô": "[oOóÓòÒôÔõÕ]",
	"õ": "[oOóÓòÒôÔõÕ]",
	"ú": "[uUúÚùÙûÛũŨ]",
	"ù": "[uUúÚùÙûÛũŨ]",
	"û": "[uUúÚùÙûÛũŨ]",
	"ũ": "[uUúÚùÙûÛũŨ]",
	"ç": "[cCçÇ]",
	".": "[\\.\\s/-]{0,1}",
	"/": "[\\.\\s/-]{0,1}",
	"-": "[\\.\\s/-]{0,1}",
	" ": "[\\.\\s/-]{0,1}",
};

const transformToRegexStr = (str: string): string => {
	let makeRegex = "";
	
	for (let i = 0; i < str.length; i++) {
		const charActual = str.charAt(i);
		const regexCharActual = toRegex[charActual];

		makeRegex += regexCharActual;
	}

	return makeRegex;
};

const transformToRegex = (str: string, addSpaces: boolean = false): RegExp => {
	str = transformToRegexStr(str);

	if (addSpaces) {
		str = "\\s" + str + "\\s";
	}

	return new RegExp(str, "g");
};

export {
	toRegex,
	transformToRegexStr,
	transformToRegex,
};