export interface IPayData {
  // userName и password больше не нужны - они на бэкенде
  token?: string;
  orderNumber: string;
  amount: string;
  currency?: number;
  returnUrl: string;
  failUrl?: string;
  description?: string;
  ip?: number;
  language?: string;
  pageView?: string;
  clientId?: string;
  merchantLogin?: string;
  jsonParams?: string;
  sessionTimeoutSecs?: string;
  expirationDate?: string;
  bindingId?: string;
  features?: string;
  dynamicCallbackUrl?: string;
  email?: string;
  phone?: string;
}

export interface IResponse {
  orderId: string;
  formUrl?: string;
  errorCode?: string;
  errorMessage?: string;
}
