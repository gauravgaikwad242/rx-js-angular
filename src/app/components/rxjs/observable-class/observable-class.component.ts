import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin, merge } from 'rxjs';
import { SwapiService } from 'src/app/services/swapi/swapi.service';

@Component({
  selector: 'app-observable-class',
  templateUrl: './observable-class.component.html'
})
export class ObservableClassComponent implements OnInit{

  observablePipeTest!:Observable<String>

  constructor(private swapi:SwapiService){

  }
  ngOnInit(): void {
    let a = new Date().getTime()
    this.observablePipeTest = this.runObservable(1000)
    let second = this.runObservable(3000).subscribe((data)=>{
      console.log(data);
    })
   let third = this.runObservable(2000).subscribe((data)=>{
      console.log(data);
    })
    console.log('total time',new Date().getTime() - a);
    // console.log(first)


    //emmits data as all are completed
    forkJoin([this.runObservable(5000),this.runObservable(2000)]).subscribe((data)=>{
      console.log('forkjoin',data);

    })
    console.log('after forkjoin----');

    //emitting data as received immgediately for each observable
    merge(this.runObservable(5000),this.runObservable(2000)).subscribe((data)=>{
      console.log('merge',data);

    })
    console.log('after merge')



  }

  runObservable(timeout:number){
    return new Observable<string>((observe)=>{
      //here we can do any operation intead of doing it inside of function
      //and it will not block the main thread and will be asynchronous
      setTimeout(()=>{observe.next("emitted in sec"+timeout);observe.complete()},timeout)
      console.log("logging inside",timeout)
    })
  }

}
