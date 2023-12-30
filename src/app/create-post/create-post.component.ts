import { Component } from '@angular/core';
import { DataService } from '../create-post/create-post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

  isPostSent = false;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  formData: any = {};

  constructor(private dataService: DataService) {}

  onSubmit() {
    this.dataService.postData(this.formData).subscribe(
      (response) => {
        console.log(response);
        // Handle success, e.g., show a success message
      },
      (error) => {
        console.error(error);
        // Handle error, e.g., show an error message
      }
    );
    this.isPostSent = true;
  }





}
