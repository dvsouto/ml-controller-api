interface IDOMParserProvider {
  instance: IDOMParserInstance;
  driver: string;
  initialize: (options?: IDOMParserInstanceOptions) => IDOMParserProvider,
  getDOMParserInstance: () => IDOMParserInstance,
}

interface IDOMParserInstance {
  initialize: (options?: IDOMParserInstanceOptions) => IDOMParserInstance,
}

interface IDOMParserInstanceOptions {
  baseUrl?: string;
  timeout?: number;
  headers?: object;
}

export {
	IDOMParserProvider,
	IDOMParserInstance,
	IDOMParserInstanceOptions,
};