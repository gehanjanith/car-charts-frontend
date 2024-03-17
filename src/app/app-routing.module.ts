import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { CoperateDashboardComponent } from './coperate-dashboard/coperate-dashboard.component';
import { AdduserComponent } from './adduser/adduser.component';
import { MarketReportsComponent } from './market-reports/market-reports.component';
import { EdituserComponent } from './edituser/edituser.component';
import { DeleteuserComponent } from './deleteuser/deleteuser.component';
import { HomeComponent } from './home/home.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { InboxComponent } from './inbox/inbox.component';
import { LogoutComponent } from './logout/logout.component';
import { ModelPageComponent } from './model-page/model-page.component';
import { AppraisalDashboardComponent } from './appraisal-dashboard/appraisal-dashboard.component';
import { AppraisalRequestComponent } from './appraisal-request/appraisal-request.component';
import { AppraisalInboxComponent } from './appraisal-inbox/appraisal-inbox.component';


const routes: Routes = [
  
  //{ path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'create-post', component: CreatePostComponent},
  { path: 'coperate-dashboard', component: CoperateDashboardComponent},
  { path: 'add-user', component: AdduserComponent},
  { path: 'edit-user', component: EdituserComponent },
  { path: 'delete-user', component: DeleteuserComponent },
  { path: 'market-reports', component: MarketReportsComponent},
  { path: 'user-dashboard', component: UserDashboardComponent},
  { path: 'inbox', component: InboxComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'models', component: ModelPageComponent},
  { path: 'appraisal-dashboard', component: AppraisalDashboardComponent},
  { path: 'appraisal-request', component: AppraisalRequestComponent},
  { path: 'appraisal-inbox', component: AppraisalInboxComponent},


  



  

  


  


  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


