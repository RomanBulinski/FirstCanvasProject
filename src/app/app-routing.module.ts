import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {FlowerComponent} from "./flower/flower.component";
import {CircleComponent} from "./circle/circle.component";
import {FirstPageComponent} from "./first-page-rain/first-page.component";
import {SecondPageComponent} from "./second-page-squers/second-page.component";
import {ThirdPageComponent} from "./third-page-grows/third-page.component";
import {FranzComponent} from "./franz/franz.component";


const routes: Routes = [

  { path: 'first-component', component: FirstPageComponent },
  { path: 'second-component', component: SecondPageComponent },
  { path: 'third-component', component: ThirdPageComponent },
  { path: 'flower', component: FlowerComponent },
  { path: 'circle', component: CircleComponent },
  { path: 'franz', component: FranzComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
