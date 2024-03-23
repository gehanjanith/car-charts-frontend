import { Component, OnInit } from '@angular/core';
import { ModelPageService } from './model-page.service';

@Component({
  selector: 'app-model-page',
  templateUrl: './model-page.component.html',
  styleUrls: ['./model-page.component.scss']
})
export class ModelPageComponent implements OnInit {

  makes: string[] = [];
  models: string[] = [];
  years: string[] = [];
  selectedMake: string = '';
  selectedModel: string = '';
  selectedYear: string = '';
  YearOptions: string[] = [];
  vehiclePrice: any = null;
  username: any;
  isCollapsed = false;
userRole: any;


  
  constructor(private modelPageService: ModelPageService) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.userRole = sessionStorage.getItem('role');

    this.modelPageService.getMakes().subscribe(makes => {
      this.makes = makes;
    });
  }


  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  fetchModels(make: string): void {
    this.modelPageService.getModels(make).subscribe(models => {
      this.models = models;
    });
  }

  onMakeSelected(event: Event): void {
    const selectedMake = (event.target as HTMLSelectElement)?.value;
    this.selectedMake = selectedMake;
    this.selectedModel = '';
    this.models = [];
    this.fetchModels(selectedMake);
  }

  onModelChange(event: Event): void {
    const selectedModel = (event.target as HTMLSelectElement)?.value;
    this.selectedModel = selectedModel;
    this.fetchYearOptions();
  }

  fetchYearOptions(): void {
    if (this.selectedMake && this.selectedModel) {
      this.modelPageService.getModelsYear(this.selectedMake, this.selectedModel).subscribe(years => {
        this.YearOptions = years;
        // Set selectedYear to the first available year by default
        if (this.YearOptions.length > 0) {
          this.selectedYear = this.YearOptions[0];
        }
      });
    }
  }

  searchVehicle(): void {
    if (this.selectedMake && this.selectedModel && this.selectedYear) {
      this.modelPageService.searchVehicle(this.selectedMake, this.selectedModel, this.selectedYear)
        .subscribe((data: any[]) => {
          if (data && data.length > 0) {
            const lastResult = data[data.length - 1]; // Take only the last result
            const secondLastResult = data[data.length - 2]; // Take the second last result
  
            // Calculate price difference
            const lastPrice = parseFloat(lastResult.avg_price);
            const secondLastPrice = parseFloat(secondLastResult.avg_price);
            const priceDifference = lastPrice - secondLastPrice;
  
            // Calculate difference percentage
            const differencePercentage = (priceDifference / secondLastPrice) * 100;
  
            // Map average price, maximum price, and minimum price from the last result
            this.vehiclePrice = {
              avgPrice: lastPrice,
              maxPrice: parseFloat(lastResult.max_price),
              minPrice: parseFloat(lastResult.min_price),
              priceDifference,
              differencePercentage
            };
  
            // Extract data for the line chart
            const chartData = data.map(item => ({
              date: new Date(item.date),
              avgPrice: parseFloat(item.avg_price),
              maxPrice: parseFloat(item.max_price),
              minPrice: parseFloat(item.min_price)
            }));
            console.log('chartData.', chartData);
  
            // Draw the line chart
            this.drawChart(chartData);
          } else {
            console.error('No data found.');
          }
        });
    } else {
      console.error('Please select make, model, and year before searching.');
    }
  }
  



  drawChart(data: { date: Date; avgPrice: number; maxPrice: number; minPrice: number }[]): void {
    const canvas = document.getElementById('lineChart') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');
  
    if (!ctx) {
      console.error('Canvas context is not available.');
      return;
    }
  
    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Define chart parameters
    const padding = 60;
    const minY = padding;
    const maxY = canvas.height - padding;
    const minX = padding;
    const maxX = canvas.width - padding;
  
    // Calculate data range
    const minPrice = Math.min(...data.map(item => item.avgPrice));
    const maxPrice = Math.max(...data.map(item => item.avgPrice));
    const priceRange = maxPrice - minPrice;
  
    const minDate = Math.min(...data.map(item => item.date.getTime()));
    const maxDate = Math.max(...data.map(item => item.date.getTime()));
    const dateRange = maxDate - minDate;
  
    // Draw axes
    ctx.beginPath();
    ctx.moveTo(minX, minY);
    ctx.lineTo(minX, maxY);
    ctx.lineTo(maxX, maxY);
    ctx.stroke();
  
    // Draw x-axis labels
    const dateLabels = data.map(item => item.date.toLocaleDateString());
    const labelStep = Math.ceil(dateLabels.length / (maxX - minX));
    for (let i = 0; i < dateLabels.length; i += labelStep) {
      const xLabel = minX + (i * (maxX - minX)) / dateLabels.length;
      ctx.fillText(dateLabels[i], xLabel, maxY + 20); // Adjust the position for the label
    }
  
    // Y-axis labels (price)
    const priceLabels = [minPrice, minPrice + priceRange / 2, maxPrice];
    const yLabels = priceLabels.map(price => 'LKR ' + price.toFixed(2));
    for (let i = 0; i < priceLabels.length; i++) {
      const x = minX - 5; // Distance from Y-axis
      const y = maxY - ((priceLabels[i] - minPrice) / priceRange) * (maxY - minY);
      ctx.fillText(yLabels[i], x, y + 5); // Adjust vertical alignment
    }
  
    // Draw data points and lines
    ctx.fillStyle = 'black';
    for (let i = 0; i < data.length; i++) {
      const x = minX + ((data[i].date.getTime() - minDate) / dateRange) * (maxX - minX);
      const y = maxY - ((data[i].avgPrice - minPrice) / priceRange) * (maxY - minY);
  
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fill();
  
      if (i > 0) {
        const prevX =
          minX + ((data[i - 1].date.getTime() - minDate) / dateRange) * (maxX - minX);
        const prevY =
          maxY - ((data[i - 1].avgPrice - minPrice) / priceRange) * (maxY - minY);
  
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }
  

    canvas.addEventListener('mousemove', (event) => {
      const mouseX = event.clientX - canvas.getBoundingClientRect().left;
      const mouseY = event.clientY - canvas.getBoundingClientRect().top;
  
      for (let i = 0; i < data.length; i++) {
        const x = ((data[i].date.getTime() - minDate) / dateRange) * (maxX - minX);
        const y = maxY - ((data[i].avgPrice - minPrice) / priceRange) * (maxY - minY);

  
        if (Math.abs(mouseX - x) < 500 && Math.abs(mouseY - y) < 500) {
          const tooltipX = x + 10;
          const tooltipY = y - 10;
          
          ctx.fillStyle = 'white';
          ctx.fillRect(tooltipX, tooltipY, 150, 50);
          ctx.fillStyle = 'black';
          ctx.fillText('Date: ' + data[i].date.toLocaleDateString(), tooltipX + 5, tooltipY + 15);
          ctx.fillText('Avg Price: ' + data[i].avgPrice.toFixed(2), tooltipX + 5, tooltipY + 30);
          ctx.fillText('Min Price: ' + data[i].minPrice.toFixed(2), tooltipX + 5, tooltipY + 45);
          ctx.fillText('Max Price: ' + data[i].maxPrice.toFixed(2), tooltipX + 5, tooltipY + 60);
          return;
        }
      }
  
      // Clear tooltip if mouse is not over a data point
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.drawChart(data); // Redraw the chart without the tooltip
    });
  
    // Clear tooltip when mouse leaves the canvas area
    canvas.addEventListener('mouseleave', () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.drawChart(data); // Redraw the chart without the tooltip
    });
  }
  
  


  
  
  
  
  



}

