import { Component } from '@angular/core';
import { DataService } from '../create-post/create-post.service';
//import { FormControl, Validators } from '@angular/forms';
import { FormGroup, FormBuilder,FormControl,Validators  } from '@angular/forms';



@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

  isPostSent = false;
  makes: string[] = [];
  models: string[] = [];
  make: string = '';
  model: string = '';
  yearOptions: string[] = [];
  year:  number | undefined ;
  makeInput: FormControl = new FormControl('', Validators.required);
  userRole: any;


  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('role');

    this.dataService.getMakes().subscribe(makes => {
      this.makes = makes;
    });
  }
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  formData: any = {};

  // constructor(private dataService: DataService,private fb: FormBuilder) {}
  myForm: FormGroup;

  constructor(private dataService: DataService,private fb: FormBuilder) { 
  this.myForm = this.fb.group({
    makeInput: ['', Validators.required],
    modelInput: ['', Validators.required],
    yearInput: ['', Validators.required],
    phoneInput: ['', Validators.required],
    // Define other form controls here with their respective validators
  });
}

  
  fetchModels(make: string): void {
    this.dataService.getModels(make).subscribe(models => {
      this.models = models;
      console.log('fetchModels models:',models )
    });
  }

  onMakeSelected(event: Event): void {
    const selectedMake = (event.target as HTMLSelectElement)?.value;
    // Update the make property
    this.make = selectedMake;
    // Clear the model property
    this.model = '';
    this.models = [];
    console.log('onMakeSelected model:',this.model )
    // Fetch models for the selected make
    this.fetchModels(selectedMake);
  }
  onModelChange(event: Event): void{
    const selectedModel = (event.target as HTMLSelectElement)?.value;
    this.model = selectedModel;
    console.log('onModelChange model:',this.model )
    this.fetchYearOptions();
  }
  fetchYearOptions() {
    if (this.make && this.model) {
      this.dataService.getModelsYear(this.make, this.model).subscribe(years => {
        this.yearOptions = years;
      });
    }
  }

  onSubmit() {
    // Get the username from session storage
    const username = sessionStorage.getItem('username');
  
    // Check if username exists
    if (username) {
      // Map username to the user field in formData
      this.formData.user = username;
  
      // Post data to the server
      this.dataService.postData(this.formData).subscribe(
        () => {
          this.isPostSent = true;
          console.log("formData sucessflly saved",this.formData);
          setTimeout(() => {
            this.isPostSent = false;
          }, 5000);
        },
        (error) => {
          console.error('Error submitting data:', error);
          // Handle error, e.g., display an error message to the user
        }
      );
    } else {
      console.error('Username not found in session storage.');
      // Handle the case where username is not found in session storage
    }
  }

  isFormValid(): boolean {
    return this.makeInput && this.makeInput.valid; // Add similar checks for other fields
  }
  







}
