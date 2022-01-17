import { PURCHASE_REQUISITION_APPROVAL } from '@constant/api-endpoints';
import { IPurchaseRequisitionApproval } from '@dto/i-purchase-requisition-approval.dto';
import { QueryParamsBuilder } from '@utils/api/query-params-builder';
import axios from 'axios';

export async function getPurchaseRequisitionApproval() {
  let sort = 'createdDate,desc';
  const wrappedParams = { sort };
  const url: string = QueryParamsBuilder.withUrl(`${PURCHASE_REQUISITION_APPROVAL}`).addParams(wrappedParams).build();
  return await axios.get<IPurchaseRequisitionApproval[]>(url);
}

export async function putPurchaseRequisitionApproval(purchaseRequisitionApproval: IPurchaseRequisitionApproval) {
  return await axios.put<IPurchaseRequisitionApproval[]>((`${PURCHASE_REQUISITION_APPROVAL}/${purchaseRequisitionApproval.id}`), purchaseRequisitionApproval);
}
