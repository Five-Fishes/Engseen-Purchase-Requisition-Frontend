export interface IPurchaseRequisitionRequestItem {
  id?: number;
  componentCode: string;
  componentName: string;
  vendorId?: string;
  vendorName: string;
  stockBalance: number;
  packagingSize: number;
  noOfPacks: number;
  quantity: number;
  deliveryDate: Date;
}
