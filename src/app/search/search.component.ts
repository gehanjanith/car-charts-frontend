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

  formatPrice(price: string): string {
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

  getMaxPrice(): string {
    const maxPriceCar = this.cars.reduce((max, car) => {
      const carPrice = this.formatPrice(car.price);
      return carPrice > max ? carPrice : max;
    }, '0');
  
    return maxPriceCar === 'Negotiable' ? 'Negotiable' : this.formatPrice(maxPriceCar);
  }
  // getMinPrice(): string {
  //   const minPriceCar = this.cars.reduce((min, car) => {
  //     const carPrice = this.formatPrice(car.price);
  //     console.log('carPrice :' , carPrice)
  //     return carPrice < min ? carPrice : min;
  //   }, '9999999999');
  //   console.log('minPriceCar :' , minPriceCar)  
  //   return minPriceCar === 'Negotiable' ? 'Negotiable' : this.formatPrice(minPriceCar);
  // }
  
  getMinPrice(): string {
    const numericPrices = this.cars
      .map(car => this.formatPrice(car.price))
      .filter(price => !isNaN(Number(price)))
      .map(price => Number(price));
  
    if (numericPrices.length === 0) {
      return 'Negotiable';
    }
  
    const minPrice = Math.min(...numericPrices);
  
    return this.formatPrice(minPrice.toString());
  }
  
  
}
