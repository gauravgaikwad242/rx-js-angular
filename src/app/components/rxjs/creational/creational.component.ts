import { Component } from '@angular/core';
import { delay, map, mergeMap, of } from 'rxjs';

@Component({
  selector: 'app-creational',
  templateUrl: './creational.component.html',
  styleUrls: ['./creational.component.css']
})
export class CreationalComponent {


  ofOperator(){
    let createOf = of(1,2,3,56,7)
    createOf.subscribe((data)=>{
      console.log(data);
    })
  }
  ofOperatorDelay(){
    const source$ = of([1,4], 2, 3);

    // Use mergeMap to map each value to an inner observable
    const result$ = source$.pipe(
      mergeMap(value => of(value).pipe(
        delay(1000)))
    );
    source$.subscribe((data)=>{
      console.log(data);
    })
  }
}
