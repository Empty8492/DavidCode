import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { BootstrapdemoComponent } from './bootstrapdemo/bootstrapdemo.component';
import {HighchartsChartModule}from 'highcharts-angular';
import {FormsModule} from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    BootstrapdemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
