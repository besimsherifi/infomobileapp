import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { BodyComponent } from './components/body/body.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { FilterComponent } from './components/filter/filter.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProductCategoriesListComponent } from './components/product-categories-list/product-categories-list.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { ProductsComponent } from './components/products/products.component';
import { SetingsComponent } from './components/setings/setings.component';



const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: BodyComponent, children: [
    { path: 'allproducts', component: ProductCategoriesListComponent},
  ]
},
  { path: '', component: ProductsComponent},
  { path: 'companies', component: CompaniesComponent},
  { path: 'settings', component: SetingsComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'filter', component: FilterComponent},
  { path: 'detail/:id', component: ProductdetailsComponent},
  {path: 'favorite', component: FavoritesComponent},
                    ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }



