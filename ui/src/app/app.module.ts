import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { MaterialModule } from './utils/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { DragScrollModule } from 'ngx-drag-scroll';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BodyComponent } from './components/body/body.component';
import { ProductsComponent } from './components/products/products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { SetingsComponent } from './components/setings/setings.component';
import { MenuComponent } from './components/menu/menu.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { FilterComponent } from './components/filter/filter.component';
import { ProductCategoriesListComponent } from './components/product-categories-list/product-categories-list.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { SortPipe } from './components/Pipes/sort.pipe';
import { CompanydetailsComponent } from './components/companydetails/companydetails.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    ProductsComponent,
    HeaderComponent,
    SearchComponent,
    SetingsComponent,
    MenuComponent,
    CompaniesComponent,
    FilterComponent,
    ProductCategoriesListComponent,
    ProductdetailsComponent,
    FavoritesComponent,
    SortPipe,
    CompanydetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    DragScrollModule,
    NgxSliderModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
