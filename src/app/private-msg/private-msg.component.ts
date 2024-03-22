import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrivateMessageService } from './private-msg.service';

@Component({
  selector: 'app-private-msg',
  templateUrl: './private-msg.component.html',
  styleUrls: ['./private-msg.component.scss']
})
export class PrivateMsgComponent implements OnInit {
  message: string = '';
  messages: any[] = [];
  username: string | null = '';
  receiver!: string;

  // Mark postId, user as an input property
  @Input() user!: string;
  @Input() postId!: number;
  @Input() owner!: string;
  

  constructor(
    public dialogRef: MatDialogRef<PrivateMsgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private messageService: PrivateMessageService
  ) {}

  ngOnInit(): void {
    // Use this.postId instead of this.data.postId
    this.user  = this.data.user;
    console.log('fetchMessages-before init user', this.user);
    this.postId  = this.data.postId;
    console.log('fetchMessages-before init post', this.postId);

    this.owner  = this.data.owner;
    console.log('fetchMessages-before init owner', this.owner);
    this.receiver = this.owner;
    console.log('receiver',this.receiver)

    // Get username from session storage
    this.username = sessionStorage.getItem('username');

    // Fetch messages for the current postId
    this.fetchMessages();
  }

  fetchMessages() {
    // Use this.postId instead of this.data.postId
    this.messageService.getPrivateMessagesPerPost(this.postId,this.user,this.owner).subscribe((data) => {
      console.log('fetchMessages user', this.user,this.owner);
      this.messages = data;
    });
  }

  sendMessage() {
    if (!this.username) {
      console.error('Username not found in session storage.');
      return;
    }

    const { postId } = this.data;
    this.messageService.savePrivateMessage(postId, this.message, this.username, this.receiver).subscribe(
      (response) => {
        console.log('receiver passed to save PM: ',this.receiver)
        console.log('response',response);
       
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
