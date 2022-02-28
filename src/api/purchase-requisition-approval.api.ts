import { PURCHASE_REQUISITION_APPROVAL, PURCHASE_REQUISITION_APPROVAL_ITEM } from '@constant/api-endpoints';
import { IPurchaseRequisitionApprovalItem } from '@dto/i-purchase-requisition-approval-item.dto';
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
  return await axios.put<IPurchaseRequisitionApproval[]>(`${PURCHASE_REQUISITION_APPROVAL}/${purchaseRequisitionApproval.id}`, purchaseRequisitionApproval);
}

export async function postPurchaseRequisitionApprovalItem(purchaseRequisitionApprovalId: number, purchaseRequisitionApprovalItem: IPurchaseRequisitionApprovalItem) {
  const url = `${PURCHASE_REQUISITION_APPROVAL_ITEM}/${purchaseRequisitionApprovalId}`;
  return await axios.post<IPurchaseRequisitionApprovalItem>(url, purchaseRequisitionApprovalItem);
}
