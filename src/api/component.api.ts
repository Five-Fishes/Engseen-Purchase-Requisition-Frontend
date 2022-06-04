import { COMPONENT, COMPONENT_SEARCH_BULK, COMPONENT_STOCK_BALANCE } from '@constant/api-endpoints';
import { IComponentSearch } from '@dto/i-component-search.dto';
import { IPurchaseRequisitionTemplateItem } from '@dto/i-purchase-requisition-template-item.dto';
import { QueryParamsBuilder } from '@utils/api/query-params-builder';
import axios from 'axios';

export async function getItemBySearch(component?: string | null, vendor?: string | null, packingSize?: number | null) {
  const url = QueryParamsBuilder.withUrl(COMPONENT).addParams({ component, vendor, packingSize }).build();
  return await axios.get<IPurchaseRequisitionTemplateItem[]>(url);
}

export async function getItemBySearchComponentAndVendorId(component?: string | null, vendorId?: string | null) {
  const url = QueryParamsBuilder.withUrl(`${COMPONENT}/${component}/vendor/${vendorId}`).addParams({}).build();
  return await axios.get<IPurchaseRequisitionTemplateItem[]>(url);
}

export async function getItemBySearchComponentOrVendor(component?: string | null, vendor?: string | null) {
  const url = QueryParamsBuilder.withUrl(`${COMPONENT}/search`).addParams({ component, vendor }).build();
  return await axios.get<IPurchaseRequisitionTemplateItem[]>(url);
}

export async function bulkGetItemBySearch(componentSearch: IComponentSearch[]) {
  return await axios.post<IPurchaseRequisitionTemplateItem[]>(COMPONENT_SEARCH_BULK, componentSearch);
}

export async function getStockBalance(componentCode: string) {
  const url = COMPONENT_STOCK_BALANCE + `/${componentCode}`;
  return await axios.get<number>(url);
}
