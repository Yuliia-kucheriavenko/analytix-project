import { IUserLogin, IUserRegist } from "../IUser";

export interface AuthResponseLogin {
  accessToken: string;
  refreshToken: string;
  user: IUserLogin
}

export interface AuthResponseRegistr {
  accessToken: string;
  refreshToken: string;
  user: IUserRegist
}