export interface Phone {
  id: string;
  brand: string;
  name: string;
  price: number;
  originalPrice?: number;
  storage: number;
  ram: number;
  screen: number;
  camera: string;
  battery: number;
  colors: string[];
  releaseYear: number;
  stock: number;
  rating: number;
  onSale: boolean;
}

export interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
}

export interface CartItem {
  phoneId: string;
  color: string;
  qty: number;
}

export interface OrderItem {
  phoneId: string;
  name: string;
  color: string;
  qty: number;
  price: number;
}

export interface Customer {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customer: Customer;
}
