const settings = {
	"amperes": [
		/[\s\-xX]{1}([0-9]{1,2})[aA][^a-zA-Z0-9]/ // 20A
	],
	"centimetros": [
		/[\s\-xX]{1}([0-9]{1,4})[cC][mM][^a-zA-Z0-9]/, // 60CM
		/[\s\-xX]{1}([0-9]{1,4})[cC][^a-zA-Z0-9]/, // 60C
	],
	"gramas": [
		/[\s\-xX]{1}([0-9]{1,4})[gG][rR][aA][^a-zA-Z0-9]/, // 250GRA
		/[\s\-xX]{1}([0-9]{1,4})[gG][rR][^a-zA-Z0-9]/, // 250GR
		/[\s\-xX]{1}([0-9]{1,4})[gG][^a-zA-Z0-9]/, // 250G
	],
	"metros": [
		/[\s\-xX]{1}([0-9]{1,4})[mM][tT][sS][^a-zA-Z0-9]/, // 20MTS
		/[\s\-xX]{1}([0-9]{1,4})[mM][tT][^a-zA-Z0-9]/, // 20MT
		/[\s\-xX]{1}([0-9]{1,4})[mM][^a-zA-Z0-9]/, // 20M
	],
	"milimetros": [
		/[\s\-xX]{1}([0-9]{1,5})[mM][mM][^a-zA-Z0-9]/, // 120MM
	],
	"quilos": [
		/[\s\-xX]{1}([0-9]{1,4})[qQ][uU][iI][lL][oO][sS][^a-zA-Z0-9]/, // 3Quilos
		/[\s\-xX]{1}([0-9]{1,4})[kK][gG][sS][^a-zA-Z0-9]/, // 3KGS
		/[\s\-xX]{1}([0-9]{1,4})[kK][gG][^a-zA-Z0-9]/, // 3KG
		/[\s\-xX]{1}([0-9]{1,4})[kK][^a-zA-Z0-9]/, // 3K
	],
	"volts": [
		/[\s\-xX]{1}([0-9]{1,4})[vV][oO][tT][sS][^a-zA-Z0-9]/, // 127Volts
		/[\s\-xX]{1}([0-9]{1,4})[vV][^a-zA-Z0-9]/ // 127V
	],
	"waterprof": [
		/[\s\-xX]{1}([iI][pP][6][56789])[^a-zA-Z0-9]/ // IP67
	],
	"watts": [
		/[\s\-xX]{1}([0-9]{1,6})[wW][aA][tT][tT][sS][^a-zA-Z0-9]/, // 9000Watts
		/[\s\-xX]{1}([0-9]{1,6})[wW][^a-zA-Z0-9]/ // 9000W
	],
};

export {
	settings,
};