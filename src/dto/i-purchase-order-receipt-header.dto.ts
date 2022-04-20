import { IPurchaseOrderReceiptItem } from './i-purchase-order-receipt-item.dto';

export interface IPurchaseOrderReceiptHeader {
  id: number | null;
  grnNo: string;
  grnDate: Date;
  vendorID: string;
  vendorName?: string;
  doNumber?: string;
  poReceiptDtoList?: IPurchaseOrderReceiptItem[];
}
