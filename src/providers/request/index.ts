import { AxiosRequest } from "./axiosRequest";
import { IRequest, IRequestInstanceOptions, IRequestOptions, RequestMethod} from "./interfaces";
import { Environment } from "@utils/environment";

class RequestProvider implements IRequest {
	declare instance: IRequest;
	declare driver: string;

	public initialize(options?: IRequestInstanceOptions) {
		this.driver = Environment().get("REQUEST_DRIVER");

		switch(this.driver) {
		case "axios":
		default:
			this.instance = new AxiosRequest();
			this.instance.initialize(options);
			break;
		}

		return this;
	}

	public getRequestInstance(): IRequest{
		return this.instance;
	}
  
	public async request(uri: string, method: RequestMethod, params?: object, options?: IRequestOptions): Promise<unknown> {
		return this.instance.request(uri, method, params, options);
	}

	public async get(uri: string, params?: object, options?: IRequestOptions): Promise<unknown> {
		return this.instance.get(uri, params, options);
	}

	public async post(uri: string, params?: object, options?: IRequestOptions): Promise<unknown> {
		return this.instance.post(uri, params, options);
	}

	public async put(uri: string, params?: object, options?: IRequestOptions): Promise<unknown> {
		return this.instance.put(uri, params, options);
	}

	public async delete(uri: string, params?: object, options?: IRequestOptions): Promise<unknown> {
		return this.instance.delete(uri, params, options);
	}

}

export {
	RequestProvider
};