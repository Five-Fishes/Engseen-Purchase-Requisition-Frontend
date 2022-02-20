import axios from 'axios';
import { IPurchaseRequisitionTemplate } from '@dto/i-purchase-requisition-template.dto';
import { PURCHASE_REQUISITION_TEMPLATE } from '@constant/api-endpoints';

export async function createPurchaseRequisitionTemplate(purchaseRequisitionTemplate: IPurchaseRequisitionTemplate) {
  return await axios.post<IPurchaseRequisitionTemplate>(PURCHASE_REQUISITION_TEMPLATE, purchaseRequisitionTemplate);
}

export async function updatePurchaseRequisitionTemplate(purchaseRequisitionTemplate: IPurchaseRequisitionTemplate) {
  return await axios.put<IPurchaseRequisitionTemplate>(`${PURCHASE_REQUISITION_TEMPLATE}/${purchaseRequisitionTemplate.id}`, purchaseRequisitionTemplate);
}

export async function getPurchaseRequisitionTemplate() {
  return await axios.get<IPurchaseRequisitionTemplate[]>(PURCHASE_REQUISITION_TEMPLATE);
}

export async function deletePurchaseRequisitionTemplate(purchaseRequisitionTemplateId: number) {
  return await axios.delete<IPurchaseRequisitionTemplate>(`${PURCHASE_REQUISITION_TEMPLATE}/${purchaseRequisitionTemplateId}`);
}
