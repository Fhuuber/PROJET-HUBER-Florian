import { HttpClient, HttpHeaders, HttpClientModule, HttpResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { filter, map, tap } from 'rxjs/operators';
import { Users } from '../model/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.backendProduct;

  private httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type':'application/json;charset=utf-8',
    })
  };

  constructor(private http:HttpClient, private store:Store) { }

  signUp(user) : Observable<HttpResponse<any>> {
    return this.http.post<any>(this.url + "signUp", user, {headers: this.httpOptions.headers});
  }

  login(user) : Observable<HttpResponse<any>> {
    return this.http.post<any>(this.url + "login", user, {headers: this.httpOptions.headers});
  }
}