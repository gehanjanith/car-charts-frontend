


// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { DashBoardPlotService } from './dashboardplot.service';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.scss']
// })
// export class DashboardComponent implements OnInit {
//   make: string = '';
//   model: string = '';
//   minYear: number = 2000;
//   maxYear: number = 2022;
//   scatterData: any[] = [];

//   chartOptions: any = {
//     chart: {
//       type: 'scatter',
//     },
//     xaxis: {
//       type: 'numeric',
//       title: {
//         text: 'Days'
//       }
//     },
//     yaxis: {
//       type: 'numeric',
//       title: {
//         text: 'Price'
//       }
//     },
//     series: [
//       {
//         name: 'Scatter Data',
//         data: this.scatterData
        
//       }
//     ]
//   };

//   constructor(private dashBoardPlotService: DashBoardPlotService) {}

//   ngOnInit() {}

//   searchCarListings() {
//     this.dashBoardPlotService
//       .getCarListings(this.make, this.model, this.minYear, this.maxYear)
//       .subscribe((data: any) => {
//         this.scatterData = data.results.map((result: { days: any; price: any; }) => ({
//           x: result.days,
//           y: result.price,
//         }));

//         // Update the chart series data after receiving the API response
//         this.chartOptions.series[0].data = this.scatterData;

//         // Print the scatterData to the console
//         //console.log('Scatter Data:', this.scatterData);
//         console.log('chartOptions Data:',this.chartOptions)
      
//       });
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { DashBoardPlotService } from './dashboardplot.service';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.scss']
// })
// export class DashboardComponent implements OnInit {
//   make: string = '';
//   model: string = '';
//   minYear: number = 2000;
//   maxYear: number = 2022;
//   scatterData: any[] = [];

//   chartOptions: any = {
//     chart: {
//       type: 'scatter',
//     },
//     xaxis: {
//       type: 'numeric',
//       title: {
//         text: 'Days'
//       }
//     },
//     yaxis: {
//       type: 'numeric',
//       title: {
//         text: 'Price'
//       }
//     },
//     series: [
//       {
//         name: 'Scatter Data',
//         data: this.scatterData
//       }
//     ]
//   };

//   constructor(private dashBoardPlotService: DashBoardPlotService) {}

//   ngOnInit() {}

//   convertDaysToNumeric(daysString: string): number {
//     const parts = daysString.split(' ');
//     if (parts.length === 2 && parts[1] === 'days') {
//       return parseInt(parts[0], 10);
//     } else if (parts.length === 2 && parts[1] === 'hours') {
//       return 1; // Convert 'X hours' to 1 day as per your requirement
//     } else {
//       return 1; // Handle other cases as needed
//     }
//   }

//   convertPriceToNumeric(priceString: string): number {
//     const numericPrice = priceString.replace(/[^0-9]/g, '');
//     return parseInt(numericPrice, 10);
//   }

//   searchCarListings() {
//     this.dashBoardPlotService
//       .getCarListings(this.make, this.model, this.minYear, this.maxYear)
//       .subscribe((data: any) => {
//         this.scatterData = data.results.map((result: { days: any; price: any; }) => ({
//           x: this.convertDaysToNumeric(result.days),
//           y: this.convertPriceToNumeric(result.price),
//         }));

//         // Update the chart series data after receiving the API response
//         this.chartOptions.series[0].data = this.scatterData;

//         // Print the scatterData to the console
//         console.log('Scatter Data:', this.scatterData);
//         console.log('chartOptions Data:', this.chartOptions);
//       });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashBoardPlotService } from './dashboardplot.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}