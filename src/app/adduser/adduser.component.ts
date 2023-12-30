import { Component } from '@angular/core';

import { DataService } from '../adduser/adduser.service';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent {

  isUserAdd = false;

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
    this.isUserAdd = true;
  }

}
