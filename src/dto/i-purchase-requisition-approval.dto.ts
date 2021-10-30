import { IPurchaseRequisitionApprovalItem } from "./i-purchase-requisition-approval-item.dto";

export interface IPurchaseRequisitionApproval {
  id: number;
  createdDate: Date;
  purchaseRequisitionApprovalItems: IPurchaseRequisitionApprovalItem[];
  remarks: string;
}