// import { Component } from '@angular/core';
// import { CarService } from './search.service';

// @Component({
//   selector: 'app-search',
//   templateUrl: './search.component.html',
//   styleUrls: ['./search.component.scss']
// })
// export class SearchComponent {
//   cars: any[] = [];
//   make!: string;
//   model!: string;
//   minYear!: number;
//   maxYear!: number;

//   constructor(private carService: CarService) {}

//   searchCars() {
//     this.cars = [];
//     this.carService.searchCars(this.make, this.model, this.minYear, this.maxYear)
//       .subscribe(
//         (data: any) => {
//           // Format prices and handle sorting
//           this.cars = this.formatPricesAndSort(data.results);
//         },
//         error => {
//           console.error('Error fetching car data:', error);
//         }
//       );
//   }

//   sortByPrice(order: 'asc' | 'desc') {
//     this.cars.sort((a, b) => {
//       const priceA = this.formatPrice(a.price);
//       const priceB = this.formatPrice(b.price);

//       if (order === 'asc') {
//         return priceA.localeCompare(priceB, undefined, { numeric: true });
//       } else {
//         return priceB.localeCompare(priceA, undefined, { numeric: true });
//       }
//     });
//   }

//   private formatPrice(price: string): string {
//     if (price === 'Negotiable') {
//       return 'Negotiable';
//     } else {
//       return price.replace(/[^0-9]/g, ''); // Remove non-numeric characters
//     }
//   }

//   private formatPricesAndSort(cars: any[]): any[] {
//     // Format prices
//     const formattedCars = cars.map(car => {
//       return { ...car, formattedPrice: this.formatPrice(car.price) };
//     });

//     // Sort by formattedPrice, and move 'Negotiable' entries to the top
//     formattedCars.sort((a, b) => {
//       if (a.formattedPrice === 'Negotiable') return -1;
//       if (b.formattedPrice === 'Negotiable') return 1;

//       return parseInt(a.formattedPrice, 10) - parseInt(b.formattedPrice, 10);
//     });

//     return formattedCars;
//   }
// }

import { Component } from '@angular/core';
import { CarService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  cars: any[] = [];
  make!: string;
  model!: string;
  minYear!: number;
  maxYear!: number;

  constructor(private carService: CarService) {}

  searchCars() {
    this.cars = [];
    this.carService.searchCars(this.make, this.model, this.minYear, this.maxYear)
      .subscribe(
        (data: any) => {
          // Format prices, calculate quartiles, and handle sorting
          this.cars = this.formatPricesAndSort(data.results);
        },
        error => {
          console.error('Error fetching car data:', error);
        }
      );
  }

  sortByPrice(order: 'asc' | 'desc') {
    this.cars.sort((a, b) => {
      const priceA = this.formatPrice(a.price);
      const priceB = this.formatPrice(b.price);

      if (order === 'asc') {
        return priceA.localeCompare(priceB, undefined, { numeric: true });
      } else {
        return priceB.localeCompare(priceA, undefined, { numeric: true });
      }
    });
  }

  private formatPrice(price: string): string {
    if (price === 'Negotiable') {
      return 'Negotiable';
    } else {
      return price.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    }
  }

  private formatPricesAndSort(cars: any[]): any[] {
    // Format prices and calculate quartiles
    const formattedCars = cars.map(car => {
      const formattedPrice = this.formatPrice(car.price);
      return { ...car, formattedPrice, numericPrice: parseInt(formattedPrice, 10) };
    });

    // Sort by numericPrice
    formattedCars.sort((a, b) => a.numericPrice - b.numericPrice);

    // Calculate quartiles
    const totalCars = formattedCars.length;
    const q1Index = Math.floor(totalCars / 4);
    const q2Index = Math.floor(totalCars / 2);
    const q3Index = Math.floor((3 * totalCars) / 4);

    formattedCars.forEach((car, index) => {
      if (index <= q1Index) {
        car.priceLabel = 'Great Price';
      } else if (index <= q2Index) {
        car.priceLabel = 'Good Price';
      } else if (index <= q3Index) {
        car.priceLabel = 'Fair Price';
      } else {
        car.priceLabel = 'High Price';
      }
    });

    return formattedCars;
  }
}
