import { IPurchaseRequisitionTemplateItem } from './i-purchase-requisition-template-item.dto'

export interface IPurchaseRequisitionTemplate {
  id: number
  templateName: string
  templateItems: IPurchaseRequisitionTemplateItem[]
}
