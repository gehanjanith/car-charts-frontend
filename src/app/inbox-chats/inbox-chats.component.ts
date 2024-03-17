import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InboxChatService } from './inbox-chats.service';

@Component({
  selector: 'app-inbox-chats',
  templateUrl: './inbox-chats.component.html',
  styleUrls: ['./inbox-chats.component.scss']
})
export class InboxChatsComponent implements OnInit {
  messages: string[] = [];
  users: string[] = [];
  selectedUser: string | null = null;
  newMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<InboxChatsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private messageService: InboxChatService
  ) {}

  ngOnInit(): void {
    this.messageService.getChatsPerPost(this.data.postId).subscribe((data) => {
      this.users = data.map((item: any) => item.user);
    });
  }

  loadMessagesForUser(user: string): void {
    this.selectedUser = user;
    this.messageService.getChatsPerUser(this.data.postId, user).subscribe((data: any[]) => {
      this.messages = data.map((item: any) => item.msg); // Access "msg" property directly
      console.log("messages", this.messages);
    });
  }
  

  sendMessage(): void {
    if (!this.selectedUser || !this.newMessage.trim()) {
      return;
    }

    // Send the new message to the selected user
    this.messageService.savePrivateMessage(this.data.postId, this.newMessage, this.selectedUser).subscribe(() => {
      // Refresh messages after sending the message

    //  this.loadMessagesForUser(this.selectedUser);

      this.newMessage = ''; // Clear the new message input field
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}




