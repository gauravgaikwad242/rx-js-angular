import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ObservableClassComponent } from './components/rxjs/observable-class/observable-class.component';
import { CentreComponent } from './components/centre/centre.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CreationalComponent } from './components/rxjs/creational/creational.component';
import { TransformationComponent } from './components/rxjs/transformation/transformation.component';
import { MapComponent } from './components/rxjs/transformation/map/map.component';
import { AllComponent } from './components/rxjs/transformation/all/all.component';
import { FilteringComponent } from './components/rxjs/filtering/filtering.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ObservableClassComponent,
    CentreComponent,
    CreationalComponent,
    TransformationComponent,
    MapComponent,
    AllComponent,
    FilteringComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
