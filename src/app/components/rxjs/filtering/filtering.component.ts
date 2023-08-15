import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SwapiService } from 'src/app/services/swapi/swapi.service';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.css']
})
export class FilteringComponent implements OnInit{
  searchGroup:FormGroup;
  debounceTimeI:String=""
  distinctUntilChangedI:String=""
  constructor(private swapi:SwapiService){
    this.searchGroup = new FormGroup({
      debounceTimeDemo:new FormControl(''),
      distinctUntilChangedDemo:new FormControl(''),

    })
  }
  ngOnInit(): void {
    this.searchGroup
    .get('debounceTimeDemo')?.valueChanges
    .pipe(
      debounceTime(700) //stops the data from going ahead for a time limit check console and type in input box
      )
    .subscribe(data=>{
      console.log(`%c search string :${data}`,"color:orange")
      this.debounceTimeI = data;
    })
    this.searchGroup
    .get('distinctUntilChangedDemo')?.valueChanges
    .pipe(
      debounceTime(300), //stops the data from going ahead for a time limit check console and type in input box
      distinctUntilChanged()
      )
    .subscribe(data=>{
      console.log(`%c search string :${data}`,"color:orange")
      this.distinctUntilChangedI = data;
    })
  }

}
