const isFloat = (value: unknown): boolean => {
	if (typeof value === "number" && !Number.isNaN(value) && !Number.isInteger(value)) {
		return true;
	}

	return false;
};

export {
	isFloat
};