import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './utils/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxSliderModule } from '@angular-slider/ngx-slider';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BodyComponent } from './components/body/body.component';
import { ProductsComponent } from './components/products/products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { SetingsComponent } from './components/setings/setings.component';
import { MenuComponent } from './components/menu/menu.component';



@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    ProductsComponent,
    HeaderComponent,
    SearchComponent,
    SetingsComponent,
    MenuComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgxSliderModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

