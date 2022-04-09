import { IPurchaseOrderReceiptItem } from '@dto/i-purchase-order-receipt-item.dto';

export default function generateIndex(purchaseOrderReceiptItem: IPurchaseOrderReceiptItem): string {
  const searchIndex = JSON.stringify(purchaseOrderReceiptItem);
  return searchIndex.replace(/\s+/g, '').toLowerCase();
}
