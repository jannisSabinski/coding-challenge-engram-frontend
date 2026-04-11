import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { apiURL } from '../../environment.local';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private credentials: string | null = null;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const encoded = btoa(`${username}:${password}`);
    return this.http
      .get(`${apiURL}/user/validate`, {
        headers: {
          Authorization: `Basic ${encoded}`,
        },
      })
      .pipe(
        tap(() => {
          this.credentials = encoded;
        }),
      );
  }

  signup(username: string, password: string) {
    return this.http
      .post(`${apiURL}/user/signUp`, {
        name: username,
        password: password,
      })
      .pipe(
        tap(() => {
          this.credentials = btoa(`${username}:${password}`);
        }),
      );
  }

  changePassword(newPassword: string) {
    const username = atob(this.credentials!).split(':')[0];
    return this.http
      .patch(`${apiURL}/user/password`, {
        newPassword: newPassword,
      })
      .pipe(
        tap(() => {
          this.credentials = btoa(`${username}:${newPassword}`);
        }),
      );
  }

  deleteAccount() {
    return this.http.delete(`${apiURL}/user`).pipe(
      tap(() => {
        this.credentials = null;
      }),
    );
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
