import { IPurchaseOrderItem } from './i-purchase-order-item.dto';

export interface IPurchaseOrder {
  id: number;
  purchaseRequisitionApprovalId?: number;
  email: string;
  vendorId: string;
  vendorName?: string;
  revisionDate: Date;
  poNumber: string;
  purchaseOrderItems?: IPurchaseOrderItem[];
  emailed: boolean;
  downloaded: boolean;
}
