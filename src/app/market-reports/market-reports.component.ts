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
  


  cars: any[] = [];
  originalCars: any[] = []; // Store original unfiltered data
  makes: string[] = [];
  models: string[] = [];
  make: string = '';
  model: string = '';
  minYear: number = 0;
  maxYear: number = 0;
  isLoading: boolean = false;

  minPriceCar: number = 0;
  maxPriceCar: number = 0;
  priceRange: number[] = []; // Initial price range
  priceRange2: number = 0;
  minYearOptions: string[] = [];
  maxYearOptions: string[] = [];

  constructor(private marketReportsService: MarketReportsService) {}

  ngOnInit(): void {
    this.marketReportsService.getMakes().subscribe(makes => {
      this.makes = makes;
    });  
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
   }

  fetchModels(make: string): void {
    this.marketReportsService.getModels(make).subscribe(models => {
      this.models = models;
    });

  }

  onMakeSelected(event: Event): void {
    const selectedMake = (event.target as HTMLSelectElement)?.value;
    this.make = selectedMake;
    this.model = '';
    this.models = [];
    this.fetchModels(selectedMake);
  }

  onModelChange(event: Event): void {
    const selectedModel = (event.target as HTMLSelectElement)?.value;
    this.model = selectedModel;
    this.fetchMinYearOptions();
    this.fetchMaxYearOptions();
  }

  fetchMinYearOptions(): void {
    if (this.make && this.model) {
      this.marketReportsService.getModelsYear(this.make, this.model).subscribe(years => {
        this.minYearOptions = years;
      });
    }
  }

  fetchMaxYearOptions(): void {
    if (this.make && this.model) {
      this.marketReportsService.getModelsYear(this.make, this.model).subscribe(years => {
        this.maxYearOptions = years;
      });
    }
  }

  

  makePlot(): void {
    // Fetch car listings
    if (this.make && this.model && this.minYear && this.maxYear) {
      this.marketReportsService.getCarListings(this.make, this.model, this.minYear, this.maxYear).subscribe(data => {
        // Process car listings data and draw scatter plot
        this.drawScatterPlot(data.results);
      });
    }
  }



// drawScatterPlot(carListings: any[]): void {
//   const canvas = document.getElementById('scatterPlot') as HTMLCanvasElement;
//   const ctx = canvas?.getContext('2d');
//   if (!ctx) {
//       console.error('Canvas context is not available.');
//       return;
//   }

//   // Clear previous drawings
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   // Define chart parameters
//   const padding = 100;
//   const minY = padding;
//   const maxY = canvas.height - padding;
//   const minX = padding;
//   const maxX = canvas.width - padding;

//   // Find minimum and maximum price to calculate price range
//   const prices = carListings.map(car => {
//       const price = parseFloat(car.price.replace(/[^0-9.-]/g, ''));
//       return price < 1 ? price * 10000000 : price;
//   });
//   const minPrice = Math.min(...prices);
//   const maxPrice = Math.max(...prices);
//   const priceRange = maxPrice - minPrice;

//   // Draw axes and labels
//   // ...

//   // Register event listener for mouse hover
//   canvas.addEventListener('mousemove', (event) => {
//       const rect = canvas.getBoundingClientRect();
//       const x = event.clientX - rect.left;
//       const y = event.clientY - rect.top;

//       // Iterate through car listings and check if mouse is hovering over any dot
//       carListings.forEach((car, index) => {
//           const dotX = index * 40 + padding + 10;
//           const dotY = canvas.height - parseFloat(car.price.replace(/[^0-9.-]/g, '')) * 1000;

//           // Check if mouse is within the radius of the dot
//           if (Math.sqrt((x - dotX) ** 2 + (y - dotY) ** 2) < 5) { // Adjust the radius as needed
//               // Display tooltip with price
//               const tooltip = document.createElement('div');
//               tooltip.classList.add('tooltip');
//               tooltip.style.left = `${event.pageX}px`; // Adjust the position as needed
//               tooltip.style.top = `${event.pageY}px`; // Adjust the position as needed
//               tooltip.innerHTML = `<p>Price: <a href="${car.link}" target="_blank">${car.price}</a></p>`;
//               document.body.appendChild(tooltip);

//               // Remove tooltip after a delay
//               setTimeout(() => {
//                   tooltip.remove();
//               }, 2000); // Adjust the delay as needed
//           }
//       });
//   });

//   // Draw scatter plot points
//   carListings.forEach((car, index) => {
//       // Calculate x and y coordinates based on price and days
//       const x = index * 40 + padding + 10;
//       const y = canvas.height - parseFloat(car.price.replace(/[^0-9.-]/g, '')) * 1000;

//       // Draw scatter plot point
//       ctx.beginPath();
//       ctx.arc(x, y, 3, 0, 2 * Math.PI);
//       ctx.fillStyle = 'blue';
//       ctx.fill();

//       // Draw text label for days difference
//       ctx.fillStyle = 'black';
//       ctx.fillText(car.days.toString(), x, y + 15); // Adjust text position
//   });
// }

drawScatterPlot(carListings: any[]): void {
  const canvas = document.getElementById('scatterPlot') as HTMLCanvasElement;
  const ctx = canvas?.getContext('2d');
  if (!ctx) {
      console.error('Canvas context is not available.');
      return;
  }

  // Clear previous drawings
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Define chart parameters
  const padding = 100;
  const minY = padding;
  const maxY = canvas.height - padding;
  const minX = padding;
  const maxX = canvas.width - padding;

  // Find minimum and maximum price to calculate price range
  const prices = carListings.map(car => {
      const price = parseFloat(car.price.replace(/[^0-9.-]/g, ''));
      return price < 1 ? price * 10000000 : price;
  });
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice;

  // Draw axes and labels
  // ...

  // Register event listener for mouse hover
  canvas.addEventListener('mousemove', (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Iterate through car listings and check if mouse is hovering over any dot
      carListings.forEach((car, index) => {
          const dotX = index * 30 + padding ;
          const dotY = canvas.height - parseFloat(car.price.replace(/[^0-9.-]/g, '')) * 1000;

          // Check if mouse is within the radius of the dot
          if (Math.sqrt((x - dotX) ** 2 + (y - dotY) ** 2) < 5) { // Adjust the radius as needed
              // Display modal with price and link
              const modal = document.getElementById('modal');
              if (modal) {
                  modal.innerHTML = `
                  
                  <a href="${car.link}" target="_blank" class="modal-content"> 
                  <span class="close">&times;</span>
                  <h4 class="card-title">${car.title}</h4>
                  <p><strong>Price:</strong> ${car.price}</p>
                  <p class="card-text"><strong>City:</strong> ${car.city}</p>
                  <p class="card-text"><strong>Source:</strong> ${car.supplier}</p>
                  <img src="${car.img}" alt="Car Image">
              </a>
                  `;
                  modal.style.display = 'block';

                  // Close the modal after a delay
                  setTimeout(() => {
                      modal.style.display = 'none';
                  }, 8000); // Adjust the delay as needed
              }
          }
      });
  });

  // Draw scatter plot points
  carListings.forEach((car, index) => {
      // Calculate x and y coordinates based on price and days
      const x = index * 30 + padding ;
      const y = canvas.height - parseFloat(car.price.replace(/[^0-9.-]/g, '')) * 1000;

      // Draw scatter plot point
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fillStyle = 'blue';
      ctx.fill();

      // Draw text label for days difference
      ctx.fillStyle = 'black';
      ctx.fillText(car.days.toString(), x, y + 15); // Adjust text position
  });
}

  
















}
  
  






// export class MarketReportsComponent implements OnInit {
//   isCollapsed = false;
//   toggleSidebar() {
//     this.isCollapsed = !this.isCollapsed;
//    }

   
//   make: string = '';
//   model: string = '';
//   minYear: number = 0;
//   maxYear: number = 0;

//   constructor(private marketReportsService: MarketReportsService) {}

//   ngOnInit(): void {}

//   redirectToExternalUrl(): void {
//     const externalUrl = `http://127.0.0.1:5000/plot/${this.make}/${this.model}?minYear=${this.minYear}&maxYear=${this.maxYear}`;
//     window.location.href = externalUrl;
//   }
// }