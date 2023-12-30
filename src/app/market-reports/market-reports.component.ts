// market-reports.component.ts

import { Component, OnInit } from '@angular/core';
import { MarketReportsService } from './market-report.service';

@Component({
  selector: 'app-market-reports',
  templateUrl: './market-reports.component.html',
  styleUrls: ['./market-reports.component.scss'],
})
export class MarketReportsComponent implements OnInit {
  isCollapsed = false;
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
   }

   
  make: string = '';
  model: string = '';
  minYear: number = 0;
  maxYear: number = 0;

  constructor(private marketReportsService: MarketReportsService) {}

  ngOnInit(): void {}

  redirectToExternalUrl(): void {
    const externalUrl = `http://127.0.0.1:5000/plot/${this.make}/${this.model}?minYear=${this.minYear}&maxYear=${this.maxYear}`;
    window.location.href = externalUrl;
  }
}

 
  
  

