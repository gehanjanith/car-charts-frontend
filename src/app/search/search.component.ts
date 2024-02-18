import { Component } from '@angular/core';
import { CarService } from './search.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  cars: any[] = [];
  originalCars: any[] = []; // Store original unfiltered data
  makes: string[] = [];
  models: string[] = [];
  make: string = '';
  model: string = '';
  minYear: number = 0;
  maxYear: number = 0;
  isLoading: boolean = false;

 minPriceCar: number = 0;;
 maxPriceCar: number = 0;;
 priceRange: number[] = []; // Initial price range
 priceRange2: number = 0;;




  constructor(private carService: CarService) {
    this.minPriceCar = 0; // Example: Set default to 0
    
    // Update initial price range with min and max values
    this.priceRange = [this.minPriceCar, this.maxPriceCar];

  }

  ngOnInit(): void {
    this.carService.getMakes().subscribe(makes => {
      this.makes = makes;
    });
  }

  fetchModels(make: string): void {
    this.carService.getModels(make).subscribe(models => {
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
  }
  

  searchCars() {
    this.isLoading = true;
    this.cars = [];
    this.originalCars = [];

    this.carService.searchCars(this.make, this.model, this.minYear, this.maxYear)
      .subscribe(
        (data: any) => {
          console.log('API make:',this.make )
          console.log('API model:',this.model )
          // Format prices, calculate quartiles, and handle sorting
          this.cars = this.formatPricesAndSort(data.results);
          this.maxPriceCar = parseInt(this.getMaxPrice(), 10);
          this.priceRange = [this.minPriceCar, this.maxPriceCar];

          this.originalCars = this.formatPricesAndSort(data.results);
          this.cars = [...this.originalCars];
          console.log('originalCars :',this.originalCars );


          this.isLoading = false;
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
  
  onPriceRangeChange(): void {
    // Filter originalCars based on price range
    this.cars = this.originalCars.filter(car => {
      const carPrice = parseFloat(this.formatPrice(car.price));
      console.log("priceRange :",this.priceRange2,"<",carPrice )

      return carPrice <= this.priceRange2;
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
