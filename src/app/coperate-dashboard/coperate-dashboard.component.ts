import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessagesComponent } from '../messages/messages.component';
import { Post } from './post.model'; // Import the Post model
import { PrivateMsgComponent } from '../private-msg/private-msg.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-coperate-dashboard',
  templateUrl: './coperate-dashboard.component.html',
  styleUrls: ['./coperate-dashboard.component.scss']
})

export class CoperateDashboardComponent implements OnInit {
  isCollapsed = false;
 // postId!: string;
  postId!: number;
  user!: string;
post!: Post ;
selectedPostId: string | null = null;
username: any;
owner: any;
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
}








