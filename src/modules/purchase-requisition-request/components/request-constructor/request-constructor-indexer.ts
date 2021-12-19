import { IPurchaseRequisitionTemplateItem } from '@dto/i-purchase-requisition-template-item.dto';

export default function generateIndex(purchaseRequisitionTemplateItem: IPurchaseRequisitionTemplateItem): string {
  const searchIndex = JSON.stringify(purchaseRequisitionTemplateItem);
  return searchIndex.replace(/\s+/g, '').toLowerCase();
}
