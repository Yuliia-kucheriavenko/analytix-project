import { IUserLogin, IUserRegist } from '../models/IUser';
import {makeAutoObservable} from 'mobx';
import AuthService from "../services/AuthService";
import axios from "axios";
import { API_URL } from "../http";
import { AuthResponseLogin } from "../models/response/AuthResponse";
import { jwtDecode } from "jwt-decode";


export default class Store {
  user = {} as IUserRegist | IUserLogin;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUserRegist | IUserLogin) {
    this.user = user;
  }


  async login(email: string, password: string, role: string) {
    try {
      const response = await AuthService.login(email, password, role);
      const token = response.data.accessToken
      localStorage.setItem('token', token);
      this.setAuth(true);
      this.setUser(response.data.user);
      return jwtDecode(token);
      
    } catch (e: any) {
      console.error("Login Error:", e);
      const errorMessage = e.response?.data?.message || 'Помилка авторизації';
      alert(errorMessage);
  }
  }

  async registration(name: string, email: string, password: string, role: string) { 
    try {
      const response = await AuthService.registration(name, email, password, role);
      const token = response.data.accessToken
      localStorage.setItem('token', token);
      this.setAuth(true);
      this.setUser(response.data.user);
      return jwtDecode(token);
      
    } catch (e: any) {
      console.error("Registration Error:", e);
      const errorMessage = e.response?.data?.message || 'Помилка реєстрації';
      alert(errorMessage);
  }
  }

  async loguot() {
    try {
      await AuthService.loguot();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as IUserLogin | IUserRegist);
      
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }

  async checkAuth() {
    try {
      const response = await axios.get<AuthResponseLogin>(`${API_URL}/refresh`, {withCredentials: true});
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }
}