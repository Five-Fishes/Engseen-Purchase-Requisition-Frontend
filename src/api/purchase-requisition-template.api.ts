import axios from "axios";
import { IPurchaseRequisitionRequest } from "@dto/i-purchase-requisition-request.dto";
import { IPurchaseRequisitionTemplate } from "@dto/i-purchase-requisition-template.dto";
import { PURCHASE_REQUISITION_TEMPLATE } from "@constant/api-endpoints";

export async function createPurchaseReqiosition(purchaseRequisitionRequest: IPurchaseRequisitionRequest) {
  return await axios.post<IPurchaseRequisitionTemplate>(PURCHASE_REQUISITION_TEMPLATE, purchaseRequisitionRequest);
}

export async function getPurchaseRequisitionTemplate() {
  return await axios.get<IPurchaseRequisitionTemplate[]>(PURCHASE_REQUISITION_TEMPLATE);
}
