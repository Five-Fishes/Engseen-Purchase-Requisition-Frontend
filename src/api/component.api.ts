import { COMPONENT, COMPONENT_SEARCH_BULK, COMPONENT_STOCK_BALANCE } from '@constant/api-endpoints';
import { IComponentSearch } from '@dto/i-component-search.dto';
import { IPurchaseRequisitionTemplateItem } from '@dto/i-purchase-requisition-template-item.dto';
import { QueryParamsBuilder } from '@utils/api/query-params-builder';
import axios from 'axios';

export async function getItemBySearch(component?: string, vendor?: string, packingSize?: number) {
  const url = QueryParamsBuilder.withUrl(COMPONENT).addParams({ component, vendor, packingSize }).build();
  return await axios.get<IPurchaseRequisitionTemplateItem[]>(url);
}

export async function bulkGetItemBySearch(componentSearch: IComponentSearch[]) {
  return await axios.post<IPurchaseRequisitionTemplateItem[]>(COMPONENT_SEARCH_BULK, componentSearch);
}

export async function getStockBalance(componentCode: string) {
  const url = COMPONENT_STOCK_BALANCE + `/${componentCode}`;
  return await axios.get<number>(url);
}
