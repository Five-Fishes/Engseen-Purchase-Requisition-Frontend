import axios from "axios";
import { IPurchaseOrder } from "@dto/i-purchase-order.dto";
import { Sort } from "@constant/sort.enum";
import { QueryParamsBuilder } from "@utils/api/query-params-builder";
import { PURCHASE_ORDER } from "@constant/api-endpoints";

export async function createPurchaseOrder(purchaseOrder: IPurchaseOrder) {
  return await axios.post<IPurchaseOrder>(PURCHASE_ORDER, purchaseOrder);
}

export async function getPurchaseOrders(startDate: Date, endDate: Date, sortBy: Sort) {
  const wrappedParams = { startDate, endDate, sortBy };
  const url: string = QueryParamsBuilder.withUrl(PURCHASE_ORDER).addParams(wrappedParams).build();
  return await axios.get<IPurchaseOrder[]>(url);
}
