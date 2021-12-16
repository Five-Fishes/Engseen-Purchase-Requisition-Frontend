import axios from 'axios'
import { PURCHASE_REQUISITION_APPROVAL } from '@constant/api-endpoints'
import { IPurchaseRequisitionApproval } from '@dto/i-purchase-requisition-approval.dto'

export async function getPurchaseRequisitionApproval() {
  return await axios.get<IPurchaseRequisitionApproval[]>(PURCHASE_REQUISITION_APPROVAL)
}
