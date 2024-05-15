import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:5000/api/Account/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(UserName: string, Password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'Login',
      {
        UserName,
        Password,
      },
      httpOptions
    );
  }

  register(UserName: string, Password: string, Roles: string[]): Observable<any> {
    return this.http.post(
      AUTH_API + 'Register',
      {
        UserName,
        Password,
        Roles
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'Logout', { }, httpOptions);
  }

  refreshToken() {
    return this.http.post(AUTH_API + 'refreshtoken', { }, httpOptions);
  }
}
