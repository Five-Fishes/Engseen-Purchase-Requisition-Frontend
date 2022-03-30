/**
 * Authentication | User
 */
export const USER: string = 'user';
export const LOGIN: string = USER + '/login';

/**
 * Purchase Requisition Template
 */
export const PURCHASE_REQUISITION_TEMPLATE: string = 'purchase-template';

/**
 * Purchase Requisition Request
 */
export const PURCHASE_REQUISITION_REQUEST: string = 'purchase-requisition';
export const PURCHASE_REQUISITION_REQUEST_REGEX: RegExp = new RegExp(`${PURCHASE_REQUISITION_REQUEST}*`);

/**
 * Purchase Requisition Approval
 */
export const PURCHASE_REQUISITION_APPROVAL: string = 'purchase-requisition/approval';
export const PURCHASE_REQUISITION_APPROVAL_ITEM: string = PURCHASE_REQUISITION_APPROVAL + '/item';

/**
 * Purchase Order
 */
export const PURCHASE_ORDER: string = 'purchase-order';
export const PURCHASE_ORDER_DOWNLOAD: string = PURCHASE_ORDER + '/download';
export const PURCHASE_ORDER_OUTSTANDING_ITEM: string = PURCHASE_ORDER + '/outstanding-item';
export const PURCHASE_ORDER_REGEX: RegExp = new RegExp(`${PURCHASE_ORDER}*`);

/**
 * Purchase Order Receipt
 */
export const PURCHASE_ORDER_RECEIPT_HEADER: string = 'purchase-order-receipt-header';
export const PURCHASE_ORDER_RECEIPT_ITEM: string = 'purchase-order-receipt';

/**
 * Component API
 */
export const COMPONENT: string = 'component';
export const COMPONENT_SEARCH_BULK: string = COMPONENT + '/bulk-search';
export const COMPONENT_STOCK_BALANCE: string = COMPONENT + '/stock-balance';
export const GET_COMPONENT_BY_SEARCH: RegExp = new RegExp(`${COMPONENT}*`);

/**
 * Item Master
 */
 export const ITEM_MASTER: string = 'item-master';

 /**
 * Item Master
 */
 export const VENDOR_MASTER: string = 'vendor-master';
