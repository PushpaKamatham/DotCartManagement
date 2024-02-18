
export interface Product {
    id: string;
  title: string;
  price: number;
  description?: string;
  category?: string;
  image?: string;
  brandname:string;
  producttags:string[];
  }

  export interface Cart {
    id: number;
  userId: number;
  date: Date;
  products: Product[];
  }
  export interface User {
    id: string;
    email: string;
    username: string;
    password: string;
    name: {
      firstname: string;
      lastname: string;
    };
    address: {
      city: string;
      street: string;
      number: string;
      zipcode: string;
      geolocation: {
        latitude: number;
        longitude: number;
      };
    };
    phone: string;
  }