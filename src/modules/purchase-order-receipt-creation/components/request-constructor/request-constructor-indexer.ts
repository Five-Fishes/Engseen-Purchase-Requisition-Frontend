import { IPurchaseOrderItem } from '@dto/i-purchase-order-item.dto';

export default function generateIndex(purchaseOrderItem: IPurchaseOrderItem): string {
  const searchIndex = JSON.stringify(purchaseOrderItem);
  return searchIndex.replace(/\s+/g, '').toLowerCase();
}
