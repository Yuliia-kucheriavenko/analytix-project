import $api from '../http';
import { AxiosResponse } from 'axios';
import { AuthResponseLogin, AuthResponseRegistr } from '../models/response/AuthResponse';

export default class AuthService {
  static async login(email: string, password: string, role: string): Promise<AxiosResponse<AuthResponseLogin>> {
    return $api.post<AuthResponseLogin>('/login', {email, password, role})
  }
  static async registration(name: string, email: string, password: string, role: string): Promise<AxiosResponse<AuthResponseRegistr>> {
    return $api.post<AuthResponseRegistr>('/registration', {name, email, password, role})
  }
  static async loguot(): Promise<void> {
    return $api.post('/logout')
  }
}