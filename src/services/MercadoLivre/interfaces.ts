interface IMLAccessToken { 
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  user_id: number;
  refresh_token?: string; // ML not returning ??
  created_at?: number;
	expires_at?: number;
}

type MLResponse = {
  success: boolean;
  data: object;
  message?: string;
}

type MLHeaders = {
  Authorization?: string;
}

export {
	IMLAccessToken,
	MLResponse,
	MLHeaders,
};