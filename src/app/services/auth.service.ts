import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import 'rxjs';
import { config } from '../config';

@Injectable()
export class AuthService {
  private heroesUrl = config.Url + '/api/auth';
  constructor(private http: HttpClient) {}
  public logIn(studentId: string, password: string): Promise<any> {
    var url = this.heroesUrl + '/login';
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('studentId', studentId);
    urlSearchParams.append('password', password);

    return this.http
      .post(url, urlSearchParams.toString(), {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer hithaui10years',
        }),
      })
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch(this.handleError);
  }

  public async logout(): Promise<any> {
    var token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    var url = this.heroesUrl + '/logout';
    return await this.http
      .get(url, {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + token,
        }),
      })
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch(this.handleError);
  }

  public checkLogin(token: string): Promise<any> {
    var url = this.heroesUrl + '/check';
    return this.http
      .get(url, {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + token,
        }),
      })
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  }

  public active(studentId: string, code: string): Promise<any> {
    var url = this.heroesUrl + '/active';
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('studentId', studentId);
    urlSearchParams.append('code', code);

    return this.http
      .post(url, urlSearchParams.toString(), {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer hithaui10years',
        }),
      })
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch(this.handleError);
  }

  public changeEmail(studentId: string, email: string): Promise<any> {
    var url = this.heroesUrl + '/change';
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('studentId', studentId);
    urlSearchParams.append('email', email);

    return this.http
      .post(url, urlSearchParams.toString(), {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer hithaui10years',
        }),
      })
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch(this.handleError);
  }

  public resend(studentId: string): Promise<any> {
    var url = this.heroesUrl + '/resend';
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('studentId', studentId);
    return this.http
      .post(url, urlSearchParams.toString(), {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer hithaui10years',
        }),
      })
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
