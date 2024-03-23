import { Component } from '@angular/core';

import { DataService } from '../adduser/adduser.service';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent {

  isCollapsed = false;

  
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  isUserAdd = false;

  formData: any = {};


  constructor(private dataService: DataService) {}

  onSubmit() {
    this.dataService.postData(this.formData).subscribe(
      (response) => {
        console.log('formData', this.formData);
        console.log(response);
        setTimeout(() => {
          this.isUserAdd = false;
        }, 5000);
      },
      (error) => {
        console.error(error);
        // Handle error, e.g., show an error message
      }
    );
    //this.isUserAdd = true;
  }

}
