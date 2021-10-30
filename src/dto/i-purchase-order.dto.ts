import { IPurchaseOrderItem } from "./i-purchase-order-item.dto";

export interface IPurchaseOrder {
  id: number;
  purchaseRequisitionId?: number;
  email: string;
  vendorId: number;
  revisionDate: Date;
  purchaseOrderItems: IPurchaseOrderItem[];
  emailed: boolean;
  downloaded: boolean;
}