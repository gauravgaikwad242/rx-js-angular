import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { buffer, catchError, concatAll, debounceTime, delay, distinctUntilChanged, fromEvent, interval, map, mergeMap, of, switchAll, switchMap } from 'rxjs';
import { SwapiService } from 'src/app/services/swapi/swapi.service';


@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit{
  dropdownArray = [{name:"---------"}]
  searchGroup:FormGroup;
  constructor(private swapi:SwapiService){
    this.searchGroup = new FormGroup({
      searchString:new FormControl('')
    })
  }
  ngOnInit(): void {
  this.searchGroup.get('searchString')?.valueChanges
            .pipe(
              debounceTime(500),
              distinctUntilChanged(),
              switchMap(search=>{
    return this.swapi.searchPeople(search) //it will return the subscription and while returning it will subscribe to it
  }),
  map((data:HttpResponse<any>)=>{
    return data.body.results
  }),
  map((body:[])=>{
    if(body.length == 0){
      return [{name:"no results"}]
    }
    return body;
  })
  )
  .subscribe(value=>{
    console.log(value)
    this.dropdownArray = value;

  })

//   const clicks = fromEvent(document, 'click');
// const intervalEvents = interval(1000);
// const buffered = intervalEvents.pipe(buffer(clicks));
// buffered.subscribe(x => console.log(x));
  }

  concatAllDemo(){
    // let HOObs$ = of("yo","obi","jo")
    // // let HOObs$ = of(of("yo"),of("obi"),of("jo"))

    // HOObs$.pipe(map(x=>{return of(x)},concatAll())).subscribe(data=>{
    //   console.log('data',data);

    // })
    const higherOrderObservable = of(
      this.swapi.searchPeople("obi"),
      this.swapi.searchPeople("yoda"),
      this.swapi.searchPeople("jo"),
      of('World'),
      of('RxJS')
    );

    // Flatten the higher-order Observable using concatAll
    const flattenedObservable = higherOrderObservable.pipe(concatAll());

    // Subscribe to the flattened Observable to receive the concatenated values
    flattenedObservable.subscribe((value) => {
      console.log(value); // Output the concatenated values: 'Hello', 'World', 'RxJS'
    });
  }



}
