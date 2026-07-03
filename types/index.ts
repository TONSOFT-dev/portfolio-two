export interface CarModel {
  id: string;
  slug: string;
  name: string;
  brand: string;
  type: "Convertible" | "Sedan" | "SUV" | "Pickup";
  image: string;
  images: string[];
  dailyRental: number;
  weeklyRental?: number;
  monthlyRental?: number;
  mileage: number;
  horsepower: number;
  engine: string;
  features: string[];
  description: string;
  transmission: string;
  fuelType: string;
  seats: number;
  year: number;
  cylinders?: number;
  doors?: number;
  baggage?: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  carModel: string;
  startDate: string;
  endDate: string;
  message?: string;
}

export interface CompanyStats {
  totalBookings: string;
  modelsInStock: string;
  clientsSatisfaction: string;
  dailyBookings: string;
}
