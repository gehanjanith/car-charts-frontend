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
  username: string | null = '';

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
    console.log('fetchMessages-before init', this.postId);

    // Get username from session storage
    this.username = sessionStorage.getItem('username');

    // Fetch messages for the current postId
    this.fetchMessages();
  }

  fetchMessages() {
    // Use this.postId instead of this.data.postId
    this.messageService.getMessages(this.postId).subscribe((data) => {
      console.log('fetchMessages', this.postId);
      this.messages = data;
    });
  }

  sendMessage() {
    if (!this.username) {
      console.error('Username not found in session storage.');
      return;
    }

    const { postId } = this.data;
    this.messageService.saveMessage(postId, this.message, this.username).subscribe(
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
