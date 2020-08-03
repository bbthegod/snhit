import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import 'rxjs';
import { config } from '../config';

@Injectable()
export class PlayService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });
  private heroesUrl = config.Url + '/api/play';

  constructor(private http: HttpClient) {}

  public GetQuestion(studentId: string): Promise<any> {
    let token = localStorage.getItem('token');
    let Url = this.heroesUrl;
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('studentId', studentId);

    return this.http
      .post(Url, urlSearchParams.toString(), {
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
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
