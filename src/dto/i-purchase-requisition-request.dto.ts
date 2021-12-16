import { IPurchaseRequisitionRequestItem } from './i-purchase-requisition-request-item.dto'

export interface IPurchaseRequisitionRequest {
  id: number
  createdDate: Date
  templateId: number
  purchaseRequisitionRequestItems: IPurchaseRequisitionRequestItem[]
  remarks: string
}
