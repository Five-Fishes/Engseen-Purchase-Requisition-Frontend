import axios from 'axios';
import { IPurchaseOrderReceiptHeader } from '@dto/i-purchase-order-receipt-header.dto';
import { IPurchaseOrderReceiptItem } from '@dto/i-purchase-order-receipt-item.dto';
import { PURCHASE_ORDER_RECEIPT_HEADER, PURCHASE_ORDER_RECEIPT_ITEM } from '@constant/api-endpoints';

export async function createPurchaseOrderReceiptHeader(purchaseReceiptHeader: IPurchaseOrderReceiptHeader) {
    return await axios.post<IPurchaseOrderReceiptHeader>(`${PURCHASE_ORDER_RECEIPT_HEADER}`, purchaseReceiptHeader);
}

export async function createPurchaseOrderReceipts(purchaseReceiptItems: IPurchaseOrderReceiptItem) {
    return await axios.post<IPurchaseOrderReceiptItem>(`${PURCHASE_ORDER_RECEIPT_ITEM}`, purchaseReceiptItems);
}