import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessagesComponent } from '../messages/messages.component';
import { Post } from './post.model'; // Import the Post model
import { PrivateMsgComponent } from '../private-msg/private-msg.component';
import { Router } from '@angular/router';
import { CoperateDashboardService } from './coperate-dashboard.service';




@Component({
  selector: 'app-coperate-dashboard',
  templateUrl: './coperate-dashboard.component.html',
  styleUrls: ['./coperate-dashboard.component.scss']
})

export class CoperateDashboardComponent implements OnInit {

isCollapsed = false;

user!: string;
post!: Post ;
selectedPostId: string | null = null;
username: any;
owner!: string; // Declare owner as a global variable
showWarningDialog = false;
confirmationMessage = '';
postToAccept: Post | null = null; // Store the post to accept
postId!: string; // Declare postId property at the top of the component class
message = '';
carListings: Post[] = [];




  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
   

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.http.get<Post[]>('http://localhost:5000/get-all-posts')
      .subscribe(
        (data: Post[]) => {
          this.carListings = data;
          console.log('carListings',this.carListings)
        },
        (error) => {
          console.error('Error fetching posts:', error);
        }
      );
  }



  constructor(private http: HttpClient, 
      private dialog: MatDialog, 
      private router: Router,   
      private coperateDashboardService: CoperateDashboardService) { }

  openMessageModal(postId: string, user: string) {
    console.log('postId : ',postId)
  
    const dialogConfig: MatDialogConfig = {
      width: '500px',
      data: { postId, user },
    };

    const dialogRef = this.dialog.open(MessagesComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openMessageModalForPost(post: Post) {
    // Assuming each post has a 'postId' property
  
   console.log('Posts',post )
    const postId = post.id;
    console.log('post',postId)
    const user = 'loggedUser'; // Replace with the actual logged-in user
    this.openMessageModal(postId, user);

    //open messages
    this.selectedPostId = post.id;
  }
  openPrivateMessageModalForPost(post: Post) {
    // Assuming each post has a 'postId' property
    
   console.log('Posts',post )
    const postId = post.id;
    const owner = post.user;
    console.log('post',postId)
    console.log('owner',owner)
       // Check if the username and owner are the same
    if (this.username === owner) {
      // If they are the same, navigate to the inbox page
      this.router.navigate(['/inbox']);
    } else {
      // If they are different, open the private message modal
      this.openPrivateMessageModal(postId, this.username, owner);
      this.selectedPostId = post.id;
    }

  }
  openPrivateMessageModal(postId: string, user: string, owner: string) {
    console.log('postId : ',postId)
    console.log('user name : ',user)
    console.log('owner in openPrivateMessageModal : ',owner)
  
    const dialogConfig: MatDialogConfig = {
      width: '500px',
      data: { postId, user, owner },
    };

    const dialogRef = this.dialog.open(PrivateMsgComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
 

  // Method to show the warning dialog
showConfirmationDialog(post: Post): void {
  this.postId = post.id;
  console.log('post', this.postId);
  this.showWarningDialog = true;
  this.owner = post.user; // Assign the owner value
}

// Method to cancel action
cancel(): void {
  this.showWarningDialog = false;
}

AcceptOffer() {
  console.log('post', this.postId);
  
 
  // Make a PUT request to update the post with the specified ID
  this.http.put<any>(`http://localhost:5000/accept-offer-post/${this.postId}`, {}).subscribe(
      response => {
          console.log(response.message); // Log the response message
          this.sendMessage()

          
      },
      error => {
          console.error('Error:', error); // Log any errors
          // Handle error scenarios, such as displaying error messages to the user
      }
  );
}

sendMessage() {
  if (!this.username) {
    console.error('Username not found in session storage.');
    return;
  }
  this.message = 'AUTO GENERATED MESSAGE: I would like to purchase this vehical at this posted price'

  console.log('postId',this.postId)
  console.log('message',this.message)
  console.log('username',this.username)
  console.log('owner',this.owner)

  this.coperateDashboardService.savePrivateMessage(this.postId, this.message, this.username, this.owner).subscribe(
    (response) => {
      console.log('response',response);

      window.location.reload();
      //Reload the page

      },
    (error) => {
      console.error(error);
      // Optionally handle error (show error message, etc.)
    }
  );
}

}








