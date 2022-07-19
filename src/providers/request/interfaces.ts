interface IRequest {
  initialize: (options?: IRequestInstanceOptions) => IRequest,
  request: (uri: string, method: RequestMethod, params?: object, options?: IRequestOptions) => Promise<void>,
  get: (uri: string, params?: object, options?: IRequestOptions) => Promise<void>,
  post: (uri: string, params?: object, options?: IRequestOptions) => Promise<void>,
  put: (uri: string, params?: object, options?: IRequestOptions) => Promise<void>,
  delete: (uri: string, params?: object, options?: IRequestOptions) => Promise<void>,
}

interface IRequestInstanceOptions {
  baseUrl?: string;
  timeout?: number;
  headers?: object;
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

export {
	IRequest,
	IRequestInstanceOptions,
	IRequestOptions,
	RequestMethod
};