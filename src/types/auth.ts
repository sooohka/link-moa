export type GoogleRefreshTokenResponse = {
  access_token: string;
  refresh_token: string | null;
  expires_in: number; // 3599;
  scope: string;
  token_type: string;
  id_token: string;
};

export type UserSession = {
  id: string;
  email: string;
  image: string;
  name: string;
} | null;
