import { Component, OnInit } from '@angular/core';
import { delay, map, mergeMap, of } from 'rxjs';

@Component({
  selector: 'app-transformation',
  templateUrl: './transformation.component.html',
  styleUrls: ['./transformation.component.css']
})
export class TransformationComponent implements OnInit{
  ngOnInit(): void {

    const source$ = of([1,4], 2, of(18,6));

// Use mergeMap to map each value to an inner observable
const result$ = source$.pipe(
  mergeMap(value => of(value).pipe(
    delay(1000)))
);

// Subscribe to the result observable
result$.subscribe(data=>{
  console.log("data->",data)
});
  }

}
