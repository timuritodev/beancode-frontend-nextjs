export interface ICartData {
  userId: number;
  productId: number;
  product_price?: string;
  product_weight?: string;
}

export interface ISessionCartData {
  // userId: number;
  productId: number;
  product_price?: string;
  product_weight?: string;
}

export interface ICartState {
  status: "idle" | "success" | "loading" | "failed";
  error: unknown;
  cart: ICart[];
}

export interface ICart {
  id: number;
  title: string;
  v_picture: string;
  h_picture: string;
  weight: string;
  price: string;
  key: string;
}
