import { UserRole } from '../constants/roles';

export interface IJwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: UserRole;
  };
  tokens: IAuthTokens;
}
