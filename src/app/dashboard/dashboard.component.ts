import { Component, OnInit } from '@angular/core';
import { ReportService } from './report.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  username: any;
  users: any[] = [];
  
  searchRecords: any[] = [];
  searchRecordsCurrentPage: any[] = [];


  isUserTableExpanded = false;
  isSearchTableExpanded = false;
  isVehicleListingsTableExpanded = false;

  currentPage: number = 1;
  pageSize: number = 10;
  Object: any;
  count: any | undefined;
  userRole: any;
  

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.userRole = sessionStorage.getItem('role');

    this.loadUsers();
    this.fetchSearchRecords();
    this.fetchVehicleListings();
  }
  
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  loadUsers(): void {
    this.reportService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  fetchVehicleListings() {
    this.reportService.getVehicleListingsCount().subscribe(count => {
      this.count = count ;
      console.log("VehicleListingsCount :",this.count)
    });
  }
  

  toggleVehicleListingsTable() : void{
    this.isVehicleListingsTableExpanded = !this.isVehicleListingsTableExpanded;
    }

  toggleUserTable(): void {
    this.isUserTableExpanded = !this.isUserTableExpanded;
  }

  toggleSearchTable(): void {
    this.isSearchTableExpanded = !this.isSearchTableExpanded;
  }

  
  


  fetchSearchRecords(): void {
    this.reportService.getSearchRecords().subscribe(data => {
      this.searchRecords = data;
      this.searchRecordsCurrentPage = this.getSearchRecordsForCurrentPage();
    });
  }

  getSearchRecordsForCurrentPage(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.searchRecords.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.getPageCount()) {
      this.currentPage++;
      this.updateSearchRecordsCurrentPage();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateSearchRecordsCurrentPage();
    }
  }

  updateSearchRecordsCurrentPage(): void {
    this.searchRecordsCurrentPage = this.getSearchRecordsForCurrentPage();
  }

  getPageCount(): number {
    return Math.ceil(this.searchRecords.length / this.pageSize);
  }

  runJob() {
        this.reportService.runPriceUpdateJob()
          .subscribe(
            (data: any) => {
              
            },
            (        error: any) => {
              console.error('Error fetching car data:', error);
            }
          );
        }
}
