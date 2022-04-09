import { PurchaseOrderReceiptItemStatus } from '@constant/purchase-order-receipt-item-status.enum';

export interface IPurchaseOrderReceiptItem {
  id: number;
  poNumber: string;
  purchaseOrderId?: number;
  itemCost?: number;
  uom?: string;
  uomPack?: string;
  remarks?: string;
  reference?: string;
  orderQuantity?: number;
  orderQuantityPack?: number;
  receivedQuantity?: number;
  receivedQuantityPack?: number;
  openQuantity?: number;
  openQuantityPack?: number;
  receivingQuantity?: number;
  receivingQuantityPack?: number;
  status?: PurchaseOrderReceiptItemStatus;
}
