import axios from 'axios';
import { IPurchaseRequisitionRequest } from '@dto/i-purchase-requisition-request.dto';
import { IPurchaseRequisitionTemplate } from '@dto/i-purchase-requisition-template.dto';
import { COMPONENT, PURCHASE_REQUISITION_TEMPLATE } from '@constant/api-endpoints';
import { IPurchaseRequisitionTemplateItem } from '@dto/i-purchase-requisition-template-item.dto';

export async function createPurchaseRequisitionTemplate(purchaseRequisitionRequest: IPurchaseRequisitionRequest) {
  return await axios.post<IPurchaseRequisitionTemplate>(PURCHASE_REQUISITION_TEMPLATE, purchaseRequisitionRequest);
}

export async function getPurchaseRequisitionTemplate() {
  return await axios.get<IPurchaseRequisitionTemplate[]>(PURCHASE_REQUISITION_TEMPLATE);
}

export async function getItemBySearch(component: string, vendor: string, packingSize?: number) {
  let url = `${COMPONENT}?component=${component}&vendor=${vendor}`;
  if (packingSize !== undefined) {
    url += `&packingSize=${packingSize}`;
  }
  return await axios.get<IPurchaseRequisitionTemplateItem[]>(url);
}
