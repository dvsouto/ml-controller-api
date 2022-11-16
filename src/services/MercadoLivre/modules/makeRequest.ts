import { MLResponse } from "../interfaces";

const makeRequest = (request: Promise<unknown>): Promise<MLResponse> => {
	return new Promise((resolve, reject) => {
		request
			.then((response) => resolve(response as unknown as MLResponse))
			.catch((err) => {
				if (typeof(err) === "object") {
					return reject(err as MLResponse);
				}

				return reject({
					success: false,
					data: false,
					message: err,
				});
			});
	});
};

export {
	makeRequest
};