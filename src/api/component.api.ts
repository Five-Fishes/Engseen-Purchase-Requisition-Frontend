import { COMPONENT, COMPONENT_SEARCH_BULK } from '@constant/api-endpoints';
import { IComponentSearch } from '@dto/i-component-search.dto';
import { IPurchaseRequisitionTemplateItem } from '@dto/i-purchase-requisition-template-item.dto';
import axios from 'axios';

export async function getItemBySearch(component: string, vendor: string, packingSize?: number) {
  let url = `${COMPONENT}?component=${component}&vendor=${vendor}`;
  if (packingSize !== undefined) {
    url += `&packingSize=${packingSize}`;
  }
  return await axios.get<IPurchaseRequisitionTemplateItem[]>(url);
}

export async function bulkGetItemBySearch(componentSearch: IComponentSearch[]) {
  return await axios.post<IPurchaseRequisitionTemplateItem[]>(COMPONENT_SEARCH_BULK, componentSearch);
}
