import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InboxChatService } from './inbox-chats.service';

@Component({
  selector: 'app-inbox-chats',
  templateUrl: './inbox-chats.component.html',
  styleUrls: ['./inbox-chats.component.scss']
})
export class InboxChatsComponent implements OnInit {
  messages: any[] = [];
  receiver: string  = '';
  username: string | null = '';
  newMessage: string = '';
  users: Set<string> = new Set<string>();
  sender: string  = '';
  user: any;

  constructor(
    public dialogRef: MatDialogRef<InboxChatsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private messageService: InboxChatService
  ) {}

  ngOnInit(): void {
    this.messageService.getChatsPerPost(this.data.postId).subscribe((data) => {
      data.forEach((item: any) => {
        if (item.user) {
          this.users.add(item.user);
        }
      });
    });
    this.username = sessionStorage.getItem('username');

  }

  loadMessagesForUser(user: string): void {
  this.receiver = user;

  if (this.sender !== null && this.username !== null) {
    this.sender = this.username;
    this.messageService.getChatsPerUser(this.data.postId, user, this.sender).subscribe((data) => {
      console.log('fetchMessages user', this.user,this.sender);
      this.messages = data;
    });


     } else {
    console.error('Sender or receiver is null.');
    }
  }
  

  sendMessage(): void {
    if (!this.username || !this.newMessage.trim()) {
      return;
    }
    const { postId } = this.data;
    this.messageService.savePrivateMessage(postId, this.newMessage, this.username, this.receiver).subscribe(
      (response) => {
        console.log('response',response);
       
        // Optionally handle success (close modal, show success message, etc.)
        this.dialogRef.close();

      this.newMessage = ''; // Clear the new message input field
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}




