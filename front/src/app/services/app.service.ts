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

  getData(firstInsta: string) : Observable<Object> {
    const params = qs.stringify({ firstInsta });
    return this.http.get(`${this.apiURL}?${params}`);
  }
}
