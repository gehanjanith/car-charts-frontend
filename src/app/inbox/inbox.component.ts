import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessagesComponent } from '../messages/messages.component';
import { Post } from '../coperate-dashboard/post.model'; // Import the Post model
import { InboxChatsComponent } from '../inbox-chats/inbox-chats.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit{

  isCollapsed = false;
  // postId!: string;
  postId!: string; // Declare postId property at the top of the component class

   //postId!: number;
   user!: string;
 post!: Post ;
 selectedPostId: string | null = null;
 username: any;
 owner: any;
 confirmationMessage = '';
 showWarningDialog = false;


      toggleSidebar() {
       this.isCollapsed = !this.isCollapsed;
      }
    
 
   ngOnInit(): void {
     this.username = sessionStorage.getItem('username');
     this.http.get<Post[]>(`http://localhost:5000/get-all-posts-per-user/${this.username}`)

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
 
   carListings: Post[] = [];
 
 
   constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) { }
 
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
    //this.selectedPostId = post.id;
     this.openMessageModal(postId, user);
 
     //open messages
     this.selectedPostId = post.id;
   }
   openChatModalForPost(post: Post) {
     // Assuming each post has a 'postId' property
     
   
    console.log('Posts',post )
     const postId = post.id;
     const owner = post.user;
     console.log('post',postId)
     console.log('owner',owner)
     this.openChatModal(postId, this.username, owner);
       this.selectedPostId = post.id;
 
   }
   openChatModal(postId: string, user: string, owner: string) {
     console.log('postId : ',postId)
     console.log('user name : ',user)
     console.log('owner in openPrivateMessageModal : ',owner)
   
     const dialogConfig: MatDialogConfig = {
       width: '500px',
       data: { postId, user, owner },
     };
 
     const dialogRef = this.dialog.open(InboxChatsComponent, dialogConfig);
 
     dialogRef.afterClosed().subscribe((result) => {
       console.log(`Dialog result: ${result}`);
     });
   }

   showConfirmationDialog(post: Post): void {
    this.postId = post.id;
    console.log('post', this.postId);
    this.showWarningDialog = true;
  }
  
  // Method to cancel action
  cancel(): void {
    this.showWarningDialog = false;
  }
  
  AcceptOffer() {
    console.log('post', this.postId);
    // Make a DELETE request to delete the post with the specified ID
    this.http.delete<any>(`http://localhost:5000/delete-post/${this.postId}`).subscribe(
        response => {
            console.log(response.message); // Log the response message
            // Handle any additional logic after successful deletion
  
            window.location.reload(); // Reload the page
  
        },
        error => {
            console.error('Error:', error); // Log any errors
            // Handle error scenarios, such as displaying error messages to the user
        }
    );
  }




}
