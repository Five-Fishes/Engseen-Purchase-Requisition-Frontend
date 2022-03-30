export interface IPurchaseOrderReceiptHeader {
  id: number;
  grnNo: string;
  grnDate: Date;
  vendorID: string;
  vendorName?: string;
  doNumber?: string;
}