import { IPurchaseRequisitionTemplateItem } from '@dto/i-purchase-requisition-template-item.dto'

export const generateIndex = (purchaseRequisitionTemplateItem: IPurchaseRequisitionTemplateItem) => {
  const searchIndex =
    (purchaseRequisitionTemplateItem.componentCode.trim() || '') + (purchaseRequisitionTemplateItem.componentName.trim() || '') + (purchaseRequisitionTemplateItem.vendorName.trim() || '')
  return searchIndex.replace(/\s+/g, '').toLowerCase()
}
