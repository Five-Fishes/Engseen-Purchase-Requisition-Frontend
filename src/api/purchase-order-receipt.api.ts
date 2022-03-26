import axios from 'axios';
import { IPurchaseOrderReceiptHeader } from '@dto/i-purchase-order-receipt-header.dto';
import { Sort } from '@constant/sort.enum';
import { QueryParamsBuilder } from '@utils/api/query-params-builder';
import { PURCHASE_ORDER_RECEIPT_HEADER } from '@constant/api-endpoints';

export async function getPurchaseOrderReceiptHeaders(startDate: Date, endDate: Date, sortBy: Sort, isSearch: boolean = false) {
    // const wrappedParams = { startDate, endDate, sortBy }; // Disabled date sorting from backend temporarily
    let sort = 'grnDate,desc';
    let wrappedParams;
    if (!isSearch) {
        wrappedParams = { sort, 'size': 5 };
    } else {
        wrappedParams = { sort };
    }
    const url: string = QueryParamsBuilder.withUrl(PURCHASE_ORDER_RECEIPT_HEADER).addParams(wrappedParams).build();
    return await axios.get<IPurchaseOrderReceiptHeader[]>(url);
}