import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  private readonly baseUrl = "https://swapi.dev/api"
  constructor(private http:HttpService) { }

  public searchPeople(nameString:string){
    return this.http._get(`${this.baseUrl}/people/?search=${nameString}`)
  }
  // public bigdata(){
  //   return this.http._get(`https://jsonplaceholder.typicode.com/photos`)
  // }

}
