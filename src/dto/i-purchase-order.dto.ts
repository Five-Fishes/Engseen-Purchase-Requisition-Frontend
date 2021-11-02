import { IPurchaseOrderItem } from "./i-purchase-order-item.dto";

export interface IPurchaseOrder {
  id: number;
  purchaseRequisitionApprovalId?: number;
  email: string;
  vendorId: number;
  revisionDate: Date;
  purchaseOrderItems: IPurchaseOrderItem[];
  emailed: boolean;
  downloaded: boolean;
}