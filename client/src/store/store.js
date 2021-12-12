import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService';

export default class Store {
  user = {};
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
    if (localStorage.getItem('token')) {
      this.setAuth(true);
      AuthService.user().then((user) => this.setUser(user));
    }
  }

  setAuth(bool) {
    this.isAuth = bool;
  }

  setUser(user) {
    this.user = user;
  }

  async login(username, password) {
    const response = await AuthService.login(username, password);
    console.log(response);
    localStorage.setItem('token', response);
    this.setAuth(true);
    const user = await AuthService.user();
    this.setUser(user);
  }

  async register(username, email, password) {
    const response = await AuthService.register(username, email, password);
    console.log(response);
    await AuthService.login(username, password);
  }

  async loginGoogle() {
    const response = await AuthService.loginGoogle();
    console.log(response);
  }

  async logout() {
    localStorage.removeItem('token');
    this.setAuth(false);
    this.setUser({});
  }
}
