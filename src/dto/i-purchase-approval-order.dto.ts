import { IPurchaseOrder } from './i-purchase-order.dto';

export interface IPurchaseApprovalOrder {
  id: number;
  createdDate: Date;
  purchaseOrders: IPurchaseOrder[];
  completed?: boolean;
}
