import axios from 'axios';
import { IPurchaseOrderReceiptHeader } from '@dto/i-purchase-order-receipt-header.dto';
import { Sort } from '@constant/sort.enum';
import { QueryParamsBuilder } from '@utils/api/query-params-builder';
import { PURCHASE_ORDER_RECEIPT_HEADER } from '@constant/api-endpoints';
import { IPurchaseOrderReceiptSearchCriteria } from '@dto/i-purchase-order-receipt-search-criteria.dto';

const PURCHASE_ORDER_RECEIPT_HEADER_LIST_DEFAULT_SIZE: number = 100;

export async function getPurchaseOrderReceiptHeaders(startDate: Date, endDate: Date, sortBy: Sort) {
    // const wrappedParams = { startDate, endDate, sortBy }; // Disabled date sorting from backend temporarily
    let sort = 'grnDate,desc';
    let wrappedParams = { sort, 'size': PURCHASE_ORDER_RECEIPT_HEADER_LIST_DEFAULT_SIZE };
    const url: string = QueryParamsBuilder.withUrl(PURCHASE_ORDER_RECEIPT_HEADER).addParams(wrappedParams).build();
    return await axios.get<IPurchaseOrderReceiptHeader[]>(url);
}

export async function searchPurchaseOrderReceiptHeaders(sortBy: Sort, poReceiptHeaderCriteria: IPurchaseOrderReceiptSearchCriteria) {
    let sort = 'grnDate,desc';
    let wrappedParams = { sort };
    const url: string = QueryParamsBuilder.withUrl(`${PURCHASE_ORDER_RECEIPT_HEADER}/search`).addParams(wrappedParams).build();
    return await axios.post<IPurchaseOrderReceiptHeader[]>(url, poReceiptHeaderCriteria);
}
