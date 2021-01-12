import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { BodyComponent } from './components/body/body.component';
import { MenuComponent } from './components/menu/menu.component';
import {  SetingsComponent } from './components/setings/setings.component';



const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: BodyComponent },
  { path: 'settings', component: SetingsComponent},
  { path: 'menu', component: MenuComponent},

                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
