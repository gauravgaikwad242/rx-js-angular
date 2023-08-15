import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, concat, concatMap, exhaustMap, mergeAll, mergeMap, of, switchMap, zip } from 'rxjs';
import { SwapiService } from 'src/app/services/swapi/swapi.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  constructor(private swapi:SwapiService){

  }

  //map mergemap etc.
/*
MERGEMAP GETS OBSERVABLE OF OBSERVABLE AND FLATTENS IT
IT WORKS FOR 1 LEVEL DEEP
SO
*/
  nestedObservable = new Observable<any>((observe)=>{
    observe.next(of("first"))
    let inner1 = new Observable<any>((innObs)=>{
      innObs.next("innerfirst")
      let innerinner1 = new Observable<any>((innObs)=>{
        innObs.next("innerInnerfirst")
      })
      innObs.next(innerinner1)
    })
    observe.next(inner1)
    observe.next("second")
  })

  mergeMapDemo(){
    this.nestedObservable.pipe(
      mergeMap(data => {
        return data
      })
    ).subscribe((data)=>{
      console.log(data);
    })
  }
  mergeMapDemoWithOf(){
    let ofobs = of(of(1,2),of("abc","def"),of(78,89))
    let pipeOf = ofobs.pipe(
      mergeMap(x=>x)
    )
    pipeOf.subscribe(data=>{
      console.log('data fromm of',data);

    })

  }
  mergeMapWithSwapi(){
    let searchStrings = of("a","yoda","obi","r2","b")
    let pipedSearch = searchStrings.pipe(
      mergeMap((string)=>{
        return this.swapi.searchPeople(string)
      })
    )
      pipedSearch.subscribe((data:HttpResponse<any>)=>{
        console.log('character',data.body);

      })
  }
  concatMapWithSwapi(){
    let searchStrings = of("a","yoda","obi","r2","b")
    let pipedSearch = searchStrings.pipe(
      concatMap((string)=>{
        return this.swapi.searchPeople(string)
      })
    )
      pipedSearch.subscribe((data:HttpResponse<any>)=>{
        console.log('character',data.body);

      })
  }
  switchMapWithSwapi(){
    let searchStrings = of("a","yoda","obi","r2","b")
    let pipedSearch = searchStrings.pipe(
      switchMap((string)=>{
        return this.swapi.searchPeople(string)
      })
    )
      pipedSearch.subscribe((data:HttpResponse<any>)=>{
        console.log('character',data.body);

      })
  }
  exhaustMapWithSwapi(){
    let searchStrings = of("yoda","a","obi","r2","b")
    let pipedSearch = searchStrings.pipe(
      exhaustMap((string)=>{
        return this.swapi.searchPeople(string)
      })
    )
      pipedSearch.subscribe((data:HttpResponse<any>)=>{
        console.log('character',data.body);

      })
  }
  zipDemo() {
    let publisher1 = this.swapi.searchPeople("a")
    let publisher2 = this.swapi.searchPeople("obi")
    let publisher3 = of('bang', 'chennai', 'hyderabad');

    let finalPublisher = zip(publisher1, publisher2, publisher3);
    finalPublisher.subscribe((data) => console.log(data));
  }
  createObservable(){
    let loop = new Observable((publisher)=>{
      //some time taking code which can be done aynchonously
      publisher.next();
    })
  }
}
