// import { Component, Inject, Input } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MessageService } from './message.service';
// import { MatDialog } from '@angular/material/dialog';

// @Component({
//   selector: 'app-messages',
//   templateUrl: './messages.component.html',
//   styleUrls: ['./messages.component.scss']
// })
// export class MessagesComponent {
//   message!: string;
//   @Input() postId!: number;
//   messages: any[] = [];
//   selectedPostId: number | null = null;
//   post: any;

//   constructor(
//     public dialogRef: MatDialogRef<MessagesComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private messageService: MessageService
//   ) {}

//   ngOnInit(): void {
//     this.messageService.getMessages(this.postId).subscribe((data) => {
//       this.messages = data;
//     });
//   }




//   sendMessage() {
//     const { postId, user } = this.data;
//     this.messageService.saveMessage(postId, this.message, user).subscribe(
//       (response) => {
//         console.log(response);
//         // Optionally handle success (close modal, show success message, etc.)
//         this.dialogRef.close();
//       },
//       (error) => {
//         console.error(error);
//         // Optionally handle error (show error message, etc.)
//       }
//     );
//   }

  
// }

import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from './message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  message: string = '';
  messages: any[] = [];

  // Mark postId as an input property
  @Input() postId!: number;

  constructor(
    public dialogRef: MatDialogRef<MessagesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // Use this.postId instead of this.data.postId
     this.postId  = this.data.postId;
    console.log('fetchMessages-before innit',this.postId)
    this.messageService.getMessages(this.postId).subscribe((data) => {
      this.messages = data;
      
    });
    this.fetchMessages();

  }
  fetchMessages() {
    // Use this.postId instead of this.data.postId
    this.messageService.getMessages(this.postId).subscribe((data) => {
      console.log('fetchMessages',this.postId)
      this.messages = data;
    });
  }

  sendMessage() {
    const { postId, user } = this.data;
    this.messageService.saveMessage(postId, this.message, user).subscribe(
      (response) => {
        console.log(response);
        // Optionally handle success (close modal, show success message, etc.)
        this.dialogRef.close();
      },
      (error) => {
        console.error(error);
        // Optionally handle error (show error message, etc.)
      }
    );
  }
}

