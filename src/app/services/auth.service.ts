import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private credentials: string | null = null;

  login(username: string, password: string) {
    this.credentials = btoa(`${username}:${password}`);
  }

  logout() {
    this.credentials = null;
  }

  getAuthHeader(): string | null {
    return this.credentials ? `Basic ${this.credentials}` : null;
  }

  isLoggedIn(): boolean {
    return !!this.credentials;
  }
}
