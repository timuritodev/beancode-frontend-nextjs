export interface IWholesale {
    title: string;
    inn: number;
    fio: string;
    phone: string;
    email: string;
    consumption: string;
  }
  
  export interface IWholesaleState {
    status: "idle" | "success" | "loading" | "failed";
    error: unknown;
    data: IWholesale[];
  }
  