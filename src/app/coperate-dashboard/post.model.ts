// post.model.ts
export class Post {
    id: string;
    title: string;
    make: string;
model: string;
year: string;
body_type: string;
city: string;
condi: string;
date: string;
description: string;
edition: string;
engine_capacity: string;
fuel_type: string;
mileage: string;
phone: string;
price: string;
    // Add other properties as needed
  
    constructor(id: string, title: string, make: string,model: string,year: string,body_type: string,city: string,condi: string,date: string,description: string,edition: string,engine_capacity: string,fuel_type: string,mileage: string,phone: string,price: string ) {
      this.id = id;
      this.title = title;
      this.make = make;
      this.model = model;
      this.year = year;
      this.body_type = body_type;
      this.city = city;
      this.condi = condi;
      this.date = date;
      this.description = description;
      this.engine_capacity = engine_capacity;
      this.fuel_type = fuel_type;
      this.mileage = mileage;
      this.phone = phone;
      this.price = price;

      this.edition = edition;
      // Initialize other properties as needed
    }
  }
  