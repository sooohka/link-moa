export type GoogleRefreshTokenResponse = {
  access_token: string;
  refresh_token: string | null;
  expires_in: number; // 3599;
  scope: string;
  token_type: string;
  id_token: string;
};
