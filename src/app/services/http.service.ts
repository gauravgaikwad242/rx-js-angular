import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  public _get(url:string,options={}):Observable<any>{
    return this.http.get<HttpResponse<any>>(url,
      {observe:'response',
      // reportProgress:true,
      ...options});
  }
}
