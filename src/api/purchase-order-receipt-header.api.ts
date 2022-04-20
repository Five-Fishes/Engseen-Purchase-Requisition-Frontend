import axios from 'axios';
import { IPurchaseOrderReceiptHeader } from '@dto/i-purchase-order-receipt-header.dto';
import { PURCHASE_ORDER_RECEIPT_HEADER } from '@constant/api-endpoints';

export async function createPurchaseOrderReceiptHeaderByVendorId(vendorId: string) {
  return await axios.post<IPurchaseOrderReceiptHeader>(`${PURCHASE_ORDER_RECEIPT_HEADER}/${vendorId}`);
}
