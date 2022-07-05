import axios from "axios";
import { IRequest } from "./interfaces";

const request = (): Promise<void> => {
	return new Promise((resolve, reject) => {

	});
};

const get = () => {
  
};

const post = () => {
  
};

const put = () => {
  
};

const _delete = () => {
  
};

const AxiosRequest: IRequest = {
	request,
	get,
	post,
	put,
	"delete": _delete
};

export {
	AxiosRequest,
	axios
};