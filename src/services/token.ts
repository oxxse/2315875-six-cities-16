const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
const USER_EMAIL_KEY_NAME = 'six-cities-user-email';

export type Token = string;

export const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};

export const saveUserEmail = (email: string): void => {
  localStorage.setItem(USER_EMAIL_KEY_NAME, email);
};

export const dropUserEmail = (): void => {
  localStorage.removeItem(USER_EMAIL_KEY_NAME);
};
