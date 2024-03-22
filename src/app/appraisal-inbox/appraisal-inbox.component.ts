// import { Component, OnInit } from '@angular/core';
// import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { Appraisal } from '../appraisal-dashboard/appraisal.model';


// @Component({
//   selector: 'app-appraisal-inbox',
//   templateUrl: './appraisal-inbox.component.html',
//   styleUrls: ['./appraisal-inbox.component.scss']
// })
// export class AppraisalInboxComponent implements OnInit {

//   username: any;
//   isCollapsed = false;
//   appraisalListings: Appraisal[] = [];
//   appraisalListings: Appraisal[] = [];

  
//   constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) { }


//   toggleSidebar() {
//     this.isCollapsed = !this.isCollapsed;
//    }

//   ngOnInit(): void {
//     this.username = sessionStorage.getItem('username');
//      this.http.get<Appraisal[]>(`http://localhost:5000/get-all-appraisal-per-user/${this.username}`)

//        .subscribe(
//          (data: Appraisal[]) => {
//            this.appraisalListings = data;
//            console.log('carListings',this.appraisalListings)
//          },
//          (error) => {
//            console.error('Error fetching posts:', error);
//          }
//        );
//   }

// }


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appraisal } from '../appraisal-dashboard/appraisal.model'; // Import the Appraisal model
import { PrivateMsgComponent } from '../private-msg/private-msg.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-appraisal-inbox',
  templateUrl: './appraisal-inbox.component.html',
  styleUrls: ['./appraisal-inbox.component.scss']
})
export class AppraisalInboxComponent implements OnInit {


  appraisalListings: Appraisal[] = [];
  username: string = ''; // Assuming username will be fetched from session storage or somewhere else
  selectedAppraisalId: string | null = null;
  isCollapsed = false;

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username') || ''; // Fetch username from session storage
    this.fetchAppraisalListings();
  }

   toggleSidebar() {
     this.isCollapsed = !this.isCollapsed;
   }

  fetchAppraisalListings(): void {
    const apiUrl = `http://localhost:5000/get-all-appraisal-per-user/${this.username}`;
    this.http.get<any[]>(apiUrl).subscribe(
      (data: any[]) => {
        this.appraisalListings = data;
        console.log('Appraisal Listings:', this.appraisalListings);
      },
      (error) => {
        console.error('Error fetching appraisal listings:', error);
      }
    );
  }

  openChatModalForPost(appraisal: Appraisal) {
    const appraisalId = appraisal.id;
    const owner = appraisal.user;

    console.log('appraisalId', appraisalId)
    console.log('owner', owner)

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

}
