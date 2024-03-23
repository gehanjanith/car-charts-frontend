import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeleteUserService } from './deleteuser.service';

@Component({
  selector: 'app-deleteuser',
  templateUrl: './deleteuser.component.html',
  styleUrls: ['./deleteuser.component.scss'],
})
export class DeleteuserComponent implements OnInit{
  isCollapsed = false;
  userId!: string | null;
  formData: any = {};
  isUserFound = false;
  isUserDeleted = false;
  userRole: any;
 

  constructor(private route: ActivatedRoute, private deleteUserService: DeleteUserService) {}

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
    this.deleteUserService.searchUserByName(this.formData.name).subscribe(
      (user) => {
        this.formData = user;
        this.isUserFound = true;
      },
      (error) => {
        console.error(error);
        this.isUserFound = false;
      }
    );
  }

  onDelete() {
    if (this.userId !== null) {
      this.deleteUserService.deleteUserData(this.userId).subscribe(
        (response) => {
          console.log(response);
          this.isUserDeleted = true;
          setTimeout(() => {
            this.isUserDeleted = false;
          }, 5000);
        },
        (error) => {
          console.error(error);
          // Handle error, e.g., show an error message
        }
      );
    } else {
      console.error('userId is null. Cannot perform delete.');
    }
  }
}
