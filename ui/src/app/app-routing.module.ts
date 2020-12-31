import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserlocationComponent } from './components/userlocation/userlocation.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'userlocation', component: UserlocationComponent }
                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
