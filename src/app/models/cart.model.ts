export interface CartItem {
  image: string;
  name: string;
  price: number;
  quantity: number;
  id: number;
}

export interface Cart {
  items: CartItem[];
}
