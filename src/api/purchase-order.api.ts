import axios from "axios";
import { IPurchaseOrder } from "@dto/i-purchase-order.dto";
import { Sort } from "@constant/sort.enum";
import { QueryParamsBuilder } from "@utils/api/query-params-builder";
import { PURCHASE_ORDER } from "@constant/api-endpoints";
import { IPurchaseApprovalOrder } from "@dto/i-purchase-approval-order.dto";

export async function createPurchaseOrder(purchaseOrder: IPurchaseOrder) {
  return await axios.post<IPurchaseApprovalOrder>(PURCHASE_ORDER, purchaseOrder);
}

export async function getPurchaseOrders(startDate: Date, endDate: Date, sortBy: Sort) {
  const wrappedParams = { startDate, endDate, sortBy };
  const url: string = QueryParamsBuilder.withUrl(PURCHASE_ORDER).addParams(wrappedParams).build();
  return await axios.get<IPurchaseApprovalOrder[]>(url);
}
