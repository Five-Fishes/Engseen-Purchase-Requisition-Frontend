import { PurchaseRequisitionApprovalStatus } from "../constant/purchase-requisition-aaproval-status.enum";
import { IPurchaseRequisitionRequestItem } from "./i-purchase-requisition-request-item.dto";

export interface IPurchaseRequisitionApprovalItem extends IPurchaseRequisitionRequestItem {
  itemCost: number;
  status: PurchaseRequisitionApprovalStatus
}