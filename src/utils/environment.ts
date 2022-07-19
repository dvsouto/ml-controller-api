import dotenv from "dotenv";

const Environment = () => {
	dotenv.config();

	const get = (name, defaultValue = undefined) => {
		return process.env[name.toUpperCase()] || defaultValue;
	};

	return {
		get,
	};
};

export {
	Environment
};
