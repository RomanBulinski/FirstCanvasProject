import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirstPageComponent } from './first-page-rain/first-page.component';
import { SecondPageComponent } from './second-page-squers/second-page.component';
import { ThirdPageComponent } from './third-page-grows/third-page.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { NavigationComponent } from './navigation/navigation.component';
import {MatCardModule} from "@angular/material/card";
import { CircleComponent } from './circle/circle.component';
import { FlowerComponent } from './flower/flower.component';
import { FranzComponent } from './franz/franz.component';
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";

@NgModule({
  declarations: [
    AppComponent,
    FirstPageComponent,
    SecondPageComponent,
    ThirdPageComponent,
    NavigationComponent,
    CircleComponent,
    FlowerComponent,
    FranzComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
