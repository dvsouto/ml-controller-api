import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import { IRequest, IRequestInstanceOptions, IRequestOptions, RequestMethod} from "./interfaces";
import querystring from "querystring";

class AxiosRequest implements IRequest {
	declare instance: AxiosInstance;

	public initialize(options?: IRequestInstanceOptions) {
		if (! options) {
			options = {} as IRequestInstanceOptions;
		}

		this.instance = axios.create({
			baseURL: options.baseUrl || undefined,
			timeout: options.timeout || 10000,
			headers: options.headers || {},
		} as AxiosRequestConfig);

		return this;
	}

	public async request(uri: string, method: RequestMethod, params?: object, options?: IRequestOptions): Promise<void> {
		if (! options) {
			options = {} as IRequestOptions;
		}

		if ((method == RequestMethod.GET && params) || options.forceQueryString) {
			const query_params = querystring.stringify(params as querystring.ParsedUrlQueryInput);

			if (! uri.includes("?")) {
				uri += "?";
			}

			uri += query_params;
			params = undefined;
		} 
		
		return this.instance.request({
			url: uri,
			method: method,
			data: params,
			...options
		} as AxiosRequestConfig);
	}

	public async get(uri: string, params?: object, options?: IRequestOptions): Promise<void> {
		return this.request(uri, RequestMethod.GET, params, options);
	}

	public async post(uri: string, params?: object, options?: IRequestOptions): Promise<void> {
		return this.request(uri, RequestMethod.POST, params, options);
	}

	public async put(uri: string, params?: object, options?: IRequestOptions): Promise<void> {
		return this.request(uri, RequestMethod.PUT, params, options);
	}

	public async delete(uri: string, params?: object, options?: IRequestOptions): Promise<void> {
		return this.request(uri, RequestMethod.DELETE, params, options);
	}
}

export {
	AxiosRequest,
	axios
};