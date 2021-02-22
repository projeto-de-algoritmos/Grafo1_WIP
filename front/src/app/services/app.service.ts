import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as qs from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  readonly apiURL : string;

  constructor(private http : HttpClient) {
    this.apiURL = 'http://localhost:3000';
  }

  getData(firstInsta: string, deph: number) : Observable<Object> {
    if (deph > 25 || deph === undefined || deph === null || deph < 0) {
      deph = 1;
    }
    const params = qs.stringify({ firstInsta, deph });
    return this.http.get(`${this.apiURL}?${params}`);
  }
}
