import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public baseUrl: string = environment.baseUrl
  private _user!: User;

  get user() {
    return { ...this._user }
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {

    const url = `${this.baseUrl}/auth`
    const body = { email, password }

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(res => {
          if(res.ok) {
            localStorage.setItem('token', res.token!)

            this._user = {
              name: res.name!,
              uid: res.uid!
            }
          }
          
        }),
        map((ok) => ok),
        catchError((err) => of(err.error.msg)
        )
      );
  }

  validateToken(): Observable<boolean>{
    const url = `${this.baseUrl}/auth`
    const headers = new HttpHeaders()
      .set('x-weather-token', localStorage.getItem('token') || '')

    return this.http.get<{ok: boolean, token: string}>(url, { headers })
      .pipe(
        map(res => {

          return res.ok
        }),
        catchError(err => of(false))
      );
  }

  logout(){
    localStorage.clear()
  }

}
