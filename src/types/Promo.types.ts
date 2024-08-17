export interface IPromo {
    promo: string;
    userId: number;
  }
  
  export interface IPromoState {
    status: "idle" | "success" | "loading" | "failed";
    error: unknown;
    data: IPromo;
  }
  