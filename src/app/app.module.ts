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
import { EdituserComponent } from './edituser/edituser.component';
import { DeleteuserComponent } from './deleteuser/deleteuser.component';
import { HomeComponent } from './home/home.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { InboxComponent } from './inbox/inbox.component';
import { LogoutComponent } from './logout/logout.component';
import { PrivateMsgComponent } from './private-msg/private-msg.component';





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
    EdituserComponent,
    DeleteuserComponent,
    HomeComponent,
    UserDashboardComponent,
    InboxComponent,
    LogoutComponent,
    PrivateMsgComponent,

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
