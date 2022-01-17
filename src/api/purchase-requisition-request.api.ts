import axios from 'axios';
import { IPurchaseRequisitionRequest } from '@dto/i-purchase-requisition-request.dto';
import { Sort } from '@constant/sort.enum';
import { QueryParamsBuilder } from '@utils/api/query-params-builder';
import { PURCHASE_REQUISITION_REQUEST } from '@constant/api-endpoints';

export async function createPurchaseRequisitionRequest(purchaseRequisitionRequest: IPurchaseRequisitionRequest) {
  return await axios.post<IPurchaseRequisitionRequest>(`${PURCHASE_REQUISITION_REQUEST}/request`, purchaseRequisitionRequest);
}

export async function getPurchaseRequisitionRequest(startDate: Date, endDate: Date, sortBy: Sort) {
  // TODO: Temporary remove filter date parameter
  // const wrappedParams = { startDate, endDate, sortBy };
  let sort = 'createdDate';
  if (sortBy === Sort.DES) {
    sort += ',desc';
  } else if (sortBy === Sort.ASC) {
    sort += ',asc';
  }
  const wrappedParams = { sort };
  const url: string = QueryParamsBuilder.withUrl(`${PURCHASE_REQUISITION_REQUEST}/submission`).addParams(wrappedParams).build();
  return await axios.get<IPurchaseRequisitionRequest[]>(url);
}
