import { Component, OnInit } from '@angular/core';
import { ModelReportService } from './model-report.service';

interface ModelReportItem {
  make: string;
  model: string;
  year: number;
  max_price: number;
  min_price: number;
  avg_price_before_last_day: number;
  avg_price_last_day: number;
  percentage_difference: number;
  [key: string]: any; // Add index signature

}

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  modelReport: ModelReportItem[] = [];
  username: any;
  sortDirection: { [key: string]: 'asc' | 'desc' } = {};
  currentPage: number = 1;
  pageSize: number = 10;
item: any;

  constructor(private modelReportService: ModelReportService) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.loadModelReport();
  }
  isCollapsed = false;

   toggleSidebar() {
     this.isCollapsed = !this.isCollapsed;
   }

  loadModelReport(): void {
    this.modelReportService.getModelReport().subscribe(data => {
      // Map the data to ModelReportItem
      this.modelReport = data.map(item => ({
        make: item.make,
        model: item.model,
        year: item.year,
        max_price: item.max_price,
        min_price: item.min_price,
        avg_price_before_last_day: item.avg_price_before_last_day,
        avg_price_last_day: item.avg_price_last_day,
        percentage_difference: item.percentage_difference
      }));
    });
  }

  getPageItems(): ModelReportItem[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.modelReport.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.getPageCount()) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getPageCount(): number {
    return Math.ceil(this.modelReport.length / this.pageSize);
  }

  sortBy(property: string): void {
    if (!this.sortDirection[property] || this.sortDirection[property] === 'asc') {
      this.modelReport.sort((a, b) => (a[property] < b[property] ? -1 : 1));
      this.sortDirection[property] = 'desc';
    } else {
      this.modelReport.sort((a, b) => (a[property] > b[property] ? -1 : 1));
      this.sortDirection[property] = 'asc';
    }
  }
}
