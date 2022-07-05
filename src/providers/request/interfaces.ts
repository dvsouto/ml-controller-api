interface IRequest {
  request: () => Promise<void>,
  get: () => Promise<void>,
  post: () => Promise<void>,
  put: () => Promise<void>,
  delete: () => Promise<void>,
}

export {
	IRequest
};