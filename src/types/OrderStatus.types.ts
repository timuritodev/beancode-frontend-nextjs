export interface IOrderStatus{
  userName?: string;
  password?: string;
  orderId: string;
  language?: string;
}

export interface IOrderStatusResponse {
  expiration: number;
  cardholderName: string;
  depositAmount: number;
  currency: number;
  approvalCode: number;
  authCode: number;
  clientId: number;
  bindingId: string;
  ErrorCode: number;
  ErrorMessage: string;
  OrderStatus: number;
  OrderNumber: string;
  Pan: string;
  Amount: number;
}
