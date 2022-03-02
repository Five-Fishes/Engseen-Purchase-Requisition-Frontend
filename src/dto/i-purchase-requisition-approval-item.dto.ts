import { PurchaseRequisitionApprovalStatus } from '@constant/purchase-requisition-approval-status.enum';
import { IPurchaseRequisitionRequestItem } from './i-purchase-requisition-request-item.dto';
import { IPurchaseRequisitionTemplateItem } from './i-purchase-requisition-template-item.dto';

export interface IPurchaseRequisitionApprovalItem extends IPurchaseRequisitionRequestItem {
  id?: number;
  itemCost: number;
  status: PurchaseRequisitionApprovalStatus;
  balance: number;
}

export function mapTemplateItemToApprovalItem(purchaseRequisitionTemplateItem: IPurchaseRequisitionTemplateItem): IPurchaseRequisitionApprovalItem {
  // TODO: [LU] ensure mapping values are correct
  return {
    componentCode: purchaseRequisitionTemplateItem.componentCode,
    componentName: purchaseRequisitionTemplateItem.componentName,
    vendorId: purchaseRequisitionTemplateItem.vendorId,
    vendorName: purchaseRequisitionTemplateItem.vendorName,
    stockBalance: 0, // TODO: [LU] need to check, difference between stockBalance and balance
    packagingSize: purchaseRequisitionTemplateItem.packagingSize,
    noOfPacks: 0,
    quantity: 0,
    deliveryDate: new Date(),
    itemCost: 0,
    status: PurchaseRequisitionApprovalStatus.TO_CONFIRM,
    balance: 0
  }
}