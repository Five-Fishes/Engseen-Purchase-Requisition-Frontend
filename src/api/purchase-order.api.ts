import axios from 'axios';
import { IPurchaseOrder } from '@dto/i-purchase-order.dto';
import { Sort } from '@constant/sort.enum';
import { QueryParamsBuilder } from '@utils/api/query-params-builder';
import { PURCHASE_ORDER, PURCHASE_ORDER_DOWNLOAD, PURCHASE_ORDER_OUTSTANDING_ITEM } from '@constant/api-endpoints';
import { IPurchaseApprovalOrder } from '@dto/i-purchase-approval-order.dto';

export async function createPurchaseOrder(purchaseOrder: IPurchaseOrder) {
  return await axios.post<IPurchaseApprovalOrder>(PURCHASE_ORDER, purchaseOrder);
}

export async function issuePO(purchaseApprovalId: number) {
  return await axios.post<IPurchaseApprovalOrder>(`${PURCHASE_ORDER}/${purchaseApprovalId}`);
}

export async function getPurchaseOrders(startDate: Date, endDate: Date, sortBy: Sort) {
  // const wrappedParams = { startDate, endDate, sortBy }; // Disabled date sorting from backend temporarily
  const wrappedParams = { sortBy };
  const url: string = QueryParamsBuilder.withUrl(PURCHASE_ORDER).addParams(wrappedParams).build();
  return await axios.get<IPurchaseApprovalOrder[]>(url);
}

export async function emailPurchaseOrder(purchaseApprovalId: number) {
  return await axios.post<void>(`${PURCHASE_ORDER}/email/${purchaseApprovalId}`);
}

export async function downloadPOFromAPI(purchaseOrderId: number) {
  return await axios.post(`${PURCHASE_ORDER_DOWNLOAD}/${purchaseOrderId}`, {}, { responseType: 'arraybuffer' });
}

export async function getOutstandingPurchaseOrder(vendorId?: string, page?: number, size?: number, sort?: number) {
  const paginationParams = {
    page,
    size,
    sort,
  };
  const vendorIdParam = {
    vendorId: vendorId,
  };
  const url: string = QueryParamsBuilder.withUrl(PURCHASE_ORDER_OUTSTANDING_ITEM).addParams(paginationParams).addParams(vendorIdParam).build();
  return await axios.get<IPurchaseOrder[]>(url);
}
