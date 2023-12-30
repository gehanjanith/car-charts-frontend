import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { CoperateDashboardComponent } from './coperate-dashboard/coperate-dashboard.component';
import { AdduserComponent } from './adduser/adduser.component';
import { MarketReportsComponent } from './market-reports/market-reports.component';


const routes: Routes = [
  
  //{ path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'create-post', component: CreatePostComponent},
  { path: 'coperate-dashboard', component: CoperateDashboardComponent},
  { path: 'add-user', component: AdduserComponent},
  { path: 'market-reports', component: MarketReportsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


