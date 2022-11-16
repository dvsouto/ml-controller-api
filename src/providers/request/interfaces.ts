interface IRequest {
  initialize: (options?: IRequestInstanceOptions) => IRequest,
  getRequestInstance: () => IRequest,
  request: (uri: string, method: RequestMethod, params?: object, options?: IRequestOptions) => Promise<unknown>,
  get: (uri: string, params?: object, options?: IRequestOptions) => Promise<unknown>,
  post: (uri: string, params?: object, options?: IRequestOptions) => Promise<unknown>,
  put: (uri: string, params?: object, options?: IRequestOptions) => Promise<unknown>,
  delete: (uri: string, params?: object, options?: IRequestOptions) => Promise<unknown>,
}

interface IRequestInstanceOptions {
  baseUrl?: string;
  timeout?: number;
  headers?: RequestHeaders;
  withCredentials?: boolean;
  validateStatus?: (status: number) => boolean;
}

interface IRequestOptions {
  headers?: object;
  forceQueryString?: boolean;
}

enum RequestMethod {
  GET = "get", 
  POST = "post", 
  PUT = "put", 
  DELETE = "delete"
}

type TRecordHeaderValue = string | string[] | number | boolean | null;
type RequestHeaders = Record<string, TRecordHeaderValue>;

export {
	IRequest,
	IRequestInstanceOptions,
	IRequestOptions,
	RequestMethod,

	TRecordHeaderValue,
	RequestHeaders,
};