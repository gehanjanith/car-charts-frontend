import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditUserService } from './edituser.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss'],
})
export class EdituserComponent implements OnInit {
  isCollapsed = false;
  userId!: string | null;
  formData: any = {};
  isUserFound = false;
  isUserAdd = false;
  isEditFailed = false;
  userRole: any;

  constructor(private route: ActivatedRoute, private editUserService: EditUserService) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
   }

  ngOnInit() {
    this.userRole = sessionStorage.getItem('role');

    // Use paramMap observable to subscribe to changes in route parameters
    this.route.paramMap.subscribe(paramMap => {
      const userIdFromRoute = paramMap.get('id');

      // Check if userIdFromRoute is a non-null string before assigning
      this.userId = typeof userIdFromRoute === 'string' ? userIdFromRoute : null;

      console.log('userId', this.userId);
    });
  }

  onSearch() {
    this.editUserService.searchUserByName(this.formData.name).subscribe(
      (user) => {
        this.formData = user;
        
        // Update userId based on the response
        if (user && user.id) {
          this.userId = user.id;
        } else {
          console.error('userId is null. Cannot perform update.');
        }

        this.isUserFound = true;
      },
      (error) => {
        console.error(error);
        this.isUserFound = false;
      }
    );
  }

  onSave() {
    // Ensure that the userId is not null before making the update call
    if (this.userId !== null) {
      this.editUserService.updateUserData(this.userId, this.formData).subscribe(
        (response) => {
          console.log(response);
          this.isUserAdd = true;
          setTimeout(() => {
            this.isUserAdd = false;
          }, 5000);
        },
        (error) => {
          console.error(error);
          this.isEditFailed = true;
          setTimeout(() => {
            this.isEditFailed = false;
          }, 5000);
        }
      );
    } else {
      this.isEditFailed = true;
      console.error('userId is null. Cannot perform update.');
    }
  }
}
