import axios from "axios";
import { IPurchaseRequisitionRequest } from "@dto/i-purchase-requisition-request.dto";
import { Sort } from "@constant/sort.enum";
import { QueryParamsBuilder } from "@utils/api/query-params-builder";
import { PURCHASE_REQUISITION_REQUEST } from "@constant/api-endpoints";

export async function createPurchaseRequisitionRequest(purchaseRequisitionRequest: IPurchaseRequisitionRequest) {
  return await axios.post<IPurchaseRequisitionRequest>(PURCHASE_REQUISITION_REQUEST, purchaseRequisitionRequest);
}

export async function getPurchaseRequisitionRequest(startDate: Date, endDate: Date, sortBy: Sort) {
  const wrappedParams = { startDate, endDate, sortBy };
  const url: string = QueryParamsBuilder.withUrl(PURCHASE_REQUISITION_REQUEST).addParams(wrappedParams).build();
  return await axios.get<IPurchaseRequisitionRequest[]>(url);
}
