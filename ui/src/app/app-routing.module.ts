import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { BodyComponent } from './components/body/body.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { FilterComponent } from './components/filter/filter.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProductsComponent } from './components/products/products.component';
import { SetingsComponent } from './components/setings/setings.component';



const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: BodyComponent },
  { path: '', component: ProductsComponent},
  { path: 'companies', component: CompaniesComponent},
  { path: 'settings', component: SetingsComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'filter', component: FilterComponent},
                    ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
