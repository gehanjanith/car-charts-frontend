// Appraisal.model.ts
export class Appraisal {
    id: string;
    make: string;
    model: string;
    year: string;
    body_type: string;
    condi: string;
    posted_date: string;
    description: string;
    edition: string;
    engine_capacity: string;
    fuel_type: string;
    mileage: string;
    user: string;
    appraiser:string;
    appraised_date:string;
    valuation:string; 
    comments:string;
    // Add other properties as needed
  
constructor(id: string, title: string, make: string,model: string,year: string,body_type: string,city: string,condi: string,posted_date: string,description: string,edition: string,engine_capacity: string,fuel_type: string,mileage: string,user: string,appraiser: string , valuation: string , comments: string , appraised_date: string) {
      this.id = id;
      this.make = make;
      this.model = model;
      this.year = year;
      this.body_type = body_type;
      this.condi = condi;
      this.posted_date = posted_date;
      this.description = description;
      this.engine_capacity = engine_capacity;
      this.fuel_type = fuel_type;
      this.mileage = mileage;
      this.user = user;
      this.edition = edition;
      this.appraiser = appraiser;
      this.appraised_date = appraised_date;
      this.valuation = valuation;
      this.comments = comments;  


      // Initialize other properties as needed
    }
  }
  