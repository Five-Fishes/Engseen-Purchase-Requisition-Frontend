import { IPurchaseRequisitionRequestItem } from '@dto/i-purchase-requisition-request-item.dto'

export const genereateIndex = (purchaseRequisitionSubmissionItem: IPurchaseRequisitionRequestItem) => {
  const searchIndex =
    (purchaseRequisitionSubmissionItem.componentName.trim() || '') +
    (purchaseRequisitionSubmissionItem.componentName.trim() || '') +
    (purchaseRequisitionSubmissionItem.vendorName.trim() || '') +
    (purchaseRequisitionSubmissionItem.deliveryDate || '')
  return searchIndex.replace(/\s+/g, '').toLowerCase()
}
