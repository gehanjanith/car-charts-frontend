import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxApexchartsModule } from 'ngx-apexcharts';
import { CreatePostComponent } from './create-post/create-post.component';
import { AdduserComponent } from './adduser/adduser.component';
import { CoperateDashboardComponent } from './coperate-dashboard/coperate-dashboard.component';
import { MessagesComponent } from './messages/messages.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarketReportsComponent } from './market-reports/market-reports.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    DashboardComponent,
    CreatePostComponent,
    AdduserComponent,
    CoperateDashboardComponent,
    MessagesComponent,
    MarketReportsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxApexchartsModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
