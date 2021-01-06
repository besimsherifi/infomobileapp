import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components

import { BodyComponent } from './components/body/body.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: BodyComponent },
                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }