import axios from 'axios';
import { IPurchaseOrderReceiptHeader } from '@dto/i-purchase-order-receipt-header.dto';
import { Sort } from '@constant/sort.enum';
import { QueryParamsBuilder } from '@utils/api/query-params-builder';
import { IPurchaseOrderReceiptSearchCriteria } from '@dto/i-purchase-order-receipt-search-criteria.dto';
import { PURCHASE_ORDER_RECEIPT } from '@constant/api-endpoints';

const PURCHASE_ORDER_RECEIPT_ITEM_LIST_DEFAULT_SIZE: number = 100;

export async function getPurchaseOrderReceiptHeaders(startDate: Date, endDate: Date, sortBy: Sort) {
  // const wrappedParams = { startDate, endDate, sortBy }; // Disabled date sorting from backend temporarily
  let sort = 'grnDate,desc';
  let wrappedParams = { sort, size: PURCHASE_ORDER_RECEIPT_ITEM_LIST_DEFAULT_SIZE };
  const url: string = QueryParamsBuilder.withUrl(PURCHASE_ORDER_RECEIPT).addParams(wrappedParams).build();
  return await axios.get<IPurchaseOrderReceiptHeader[]>(url);
}

export async function searchPurchaseOrderReceiptHeaders(sortBy: Sort, poReceiptHeaderCriteria: IPurchaseOrderReceiptSearchCriteria) {
  let sort = 'grnDate,desc';
  let wrappedParams = { sort };
  const url: string = QueryParamsBuilder.withUrl(`${PURCHASE_ORDER_RECEIPT}/search`).addParams(wrappedParams).build();
  return await axios.post<IPurchaseOrderReceiptHeader[]>(url, poReceiptHeaderCriteria);
}

export async function createPurchaseOrderReceiptHeader(purchaseReceiptHeader: IPurchaseOrderReceiptHeader) {
  return await axios.post<IPurchaseOrderReceiptHeader>(`${PURCHASE_ORDER_RECEIPT}`, purchaseReceiptHeader);
}

export async function getPurchaseOrderReceiptHeaderByGrnNo(grnNo: string) {
  return await axios.get<IPurchaseOrderReceiptHeader>(`${PURCHASE_ORDER_RECEIPT}/${grnNo}`);
}
