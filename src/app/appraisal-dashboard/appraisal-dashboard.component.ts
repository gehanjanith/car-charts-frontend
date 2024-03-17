import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appraisal } from './appraisal.model'; // Import the Appraisal model
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PrivateMsgComponent } from '../private-msg/private-msg.component';
import { Router } from '@angular/router';
import { AppraisalCommentComponent } from '../appraisal-comment/appraisal-comment.component';


@Component({
  selector: 'app-appraisal-dashboard',
  templateUrl: './appraisal-dashboard.component.html',
  styleUrls: ['./appraisal-dashboard.component.scss']
})
export class AppraisalDashboardComponent implements OnInit {


  isCollapsed = false;
  appraisalListings: Appraisal[] = []; // Initialize appraisalListings as an array of Appraisal
  username: any;
  selectedAppraisalId: string | null = null;


  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.http.get<Appraisal[]>('http://localhost:5000/get-all-new-appraisals')
      .subscribe(
        (data: Appraisal[]) => {
          this.appraisalListings = data;
          console.log('carListings', this.appraisalListings);
        },
        (error) => {
          console.error('Error fetching appraisals:', error);
        }
      );
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  openPrivateMessageModalForPost(appraisal: Appraisal) {
    // Implement your method logic here
    const appraisalId = appraisal.id;
    const owner = appraisal.user;
    // if (this.username === owner) {
    //   // If they are the same, navigate to the inbox page
    //   this.router.navigate(['/inbox']);
    // } else 
    
    {
      this.openPrivateMessageModal(appraisalId, this.username, owner);
      this.selectedAppraisalId = appraisal.id;

    }
  }

  openPrivateMessageModal(appraisalId: string, user: string, owner: string) {
    console.log('postId : ',appraisalId)
    console.log('user name : ',user)
    console.log('owner in openPrivateMessageModal : ',owner)
  
    const dialogConfig: MatDialogConfig = {
      width: '500px',
      data: { appraisalId, user, owner },
    };

    const dialogRef = this.dialog.open(PrivateMsgComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openValuateModalForPost(appraisal: Appraisal) {
    const appraisalId = appraisal.id;
    const owner = appraisal.user;
   // const appraisedUser = appraisal.appraiser;

    this.openValuationModal(appraisalId, this.username, owner);
      this.selectedAppraisalId = appraisal.id;

    }
  openValuationModal(appraisalId: string, user: string, owner: string) {
    console.log('postId : ',appraisalId)
    console.log('user name : ',user)
    console.log('owner in openPrivateMessageModal : ',owner)
  
    const dialogConfig: MatDialogConfig = {
      width: '500px',
      data: { appraisalId, user, owner },
    };

    const dialogRef = this.dialog.open(AppraisalCommentComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
