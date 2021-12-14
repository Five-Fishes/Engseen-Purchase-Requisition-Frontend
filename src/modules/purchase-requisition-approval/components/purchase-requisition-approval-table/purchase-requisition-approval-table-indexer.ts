import { IPurchaseRequisitionApprovalItem } from "@dto/i-purchase-requisition-approval-item.dto";

export default function generateIndex(purchaseRequisitionApprovalItem: IPurchaseRequisitionApprovalItem): string {
    const searchIndex = JSON.stringify(purchaseRequisitionApprovalItem);
    return searchIndex.replace(/\s+/g, '').toLowerCase();
}