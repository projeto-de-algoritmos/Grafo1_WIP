import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  readonly apiURL : string;

  constructor(private http : HttpClient) {
    this.apiURL = 'http://localhost:3000/';
  }

  getData() : Observable<Object> {
    return this.http.get(this.apiURL);
  }
}
