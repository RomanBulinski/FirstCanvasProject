import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FirstPageComponent} from "./first-page/first-page.component";
import {SecondPageComponent} from "./second-page/second-page.component";

const routes: Routes = [

  { path: 'first-component', component: FirstPageComponent },
  { path: 'second-component', component: SecondPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
