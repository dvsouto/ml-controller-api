import { dictionaries } from "./dictionaries";

enum STR_GENRE {
  FEM = "FEM",
  MASC = "MASC"
}

const getStrGenre = (str: string): STR_GENRE => {
	str = str.trim().toLocaleLowerCase().split(" ")[0];

	const lastChar = str.charAt(str.length-1);
	const llastChar = str.charAt(str.length-2);

	// Last chars = AL = MASC
	if (["l"].includes(lastChar) || ["a"].includes(llastChar)) {
		return STR_GENRE.MASC;
	}

	// Last chars = A = Fem
	if (["a"].includes(lastChar) || ["a"].includes(llastChar)) {
		return STR_GENRE.FEM;
	}

	// Last chars = O/E = Masc
	if (["o", "e"].includes(lastChar) || ["o", "e"].includes(llastChar)) {
		return STR_GENRE.MASC;
	}

	// Lampada = a
	// Ventilador = or
	// Cama = a
	// Sapato = o
	// Tenis = ele / i
	// Batata = a
	// Panela = a
	// Porta = a
	// Torneira = a
	// Fonte = ela
	// Peixe = ele
	// Sinuca = a
	// Pente = ele
	// Terminal = al = ele
	// Canal = al = ele
	// Marechal = al = ele

	return STR_GENRE.MASC;
};
const parseProduct = (product: string): string => {
	let productWordsText = product.trim().toLowerCase();

	productWordsText = productWordsText.replace(/\s([a-z])[/]/g, " $1/ "); // Add space after "/" 
	productWordsText = productWordsText.replace(/([a-z])[.]([a-z])/g, "$1 $2"); // Add space after "." and remove the "." abbreviation
	productWordsText = productWordsText.replace(/([a-z])[.]\s/g, "$1 "); // Add space after "." and remove the "." abbreviation
	productWordsText = productWordsText.replace(/\s\s+/g, " "); // Remove duplicated spaces

	// Apply first de 'all' dictionary, this dictionary apply on the all words
	Object.keys(dictionaries.all).forEach(keyDictionary => {
		const strReplace = dictionaries.all[keyDictionary];
		const isRegex = keyDictionary.substring(0, 1) == "/" && keyDictionary.substring(keyDictionary.length-1, keyDictionary.length) == "/";

		productWordsText = isRegex ? productWordsText.replace(new RegExp(keyDictionary.substring(1, keyDictionary.length-1), "g"), strReplace) : productWordsText.replace(keyDictionary, strReplace);
	});

	let productWords = productWordsText.split(" ") as Array<string>;

	productWords = productWords.map(productWord => {
		let hasDictionary = false;

		// Apply dictionaries
		Object.keys(dictionaries).forEach(keyDictionary => {
			const ignore = ["regex", "all"];
			const dictionary = dictionaries[keyDictionary] as Record<string, string>;
			const dictionaryKeys = Object.keys(dictionary) as Array<string>;
			
			if (ignore.includes(keyDictionary)) {
				return;
			}

			// Find key in dictionary
			if (dictionaryKeys.includes(productWord)) {
				productWord = dictionary[productWord] as string;
				hasDictionary = true;

				return;
			}
		});
    
		if (! hasDictionary) {
			productWord = productWord.substring(0, 1).toUpperCase() + productWord.substring(1).toLocaleLowerCase();
		}

		// Apply regex dictionaries
		Object.keys(dictionaries).forEach(keyDictionary => {
			const dictionary = dictionaries[keyDictionary] as Record<string, string>;
			const dictionaryKeys = Object.keys(dictionary) as Array<string>;
      
			// Find regex on dictionary
			dictionaryKeys.forEach((dictionaryKey) => {
				if (dictionaryKey.substring(0, 1) == "/" && dictionaryKey.substring(dictionaryKey.length-1, dictionaryKey.length) == "/") {
					const regexFind = new RegExp(dictionaryKey.substring(1, dictionaryKey.length-1), "g");
					const strReplace = dictionary[dictionaryKey];

					const matches = productWord.matchAll(regexFind);
					const firstMatch = matches.next().value;

					if (firstMatch) {
						productWord = productWord.replace(regexFind, strReplace);
					}
				}
			});
		});

		return productWord;
	});

	// Join parsed words
	let producParsed = productWords.join(" ");

	// Set genre
	if (producParsed.indexOf("#") > 0) {
		const productGenre = getStrGenre(producParsed);

		if (productGenre == STR_GENRE.MASC) {
			producParsed = producParsed.replace(/[#]/g, "o");
		}

		if (productGenre == STR_GENRE.FEM) {
			producParsed = producParsed.replace(/[#]/g, "a");
		}
	}

	// producParsed = producParsed.replace(/[0-9]{1,4}[a-z]/g, "");
  
	return producParsed;
};

export {
	parseProduct,
};