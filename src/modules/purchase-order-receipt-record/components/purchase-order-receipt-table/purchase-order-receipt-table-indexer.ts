import { IPurchaseOrderReceiptHeader } from '@dto/i-purchase-order-receipt-header.dto';

export default function generateIndex(purchaseOrderReceiptHeader: IPurchaseOrderReceiptHeader): string {
  const searchIndex = JSON.stringify(purchaseOrderReceiptHeader);
  return searchIndex.replace(/\s+/g, '').toLowerCase();
}
