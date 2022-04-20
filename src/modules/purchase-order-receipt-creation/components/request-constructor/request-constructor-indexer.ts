import { IPurchaseOrderItem } from '@dto/i-purchase-order-item.dto';

export default function generateIndex(purchaseOrderReceiptItem: IPurchaseOrderItem): string {
  const searchIndex = JSON.stringify(purchaseOrderReceiptItem);
  return searchIndex.replace(/\s+/g, '').toLowerCase();
}
