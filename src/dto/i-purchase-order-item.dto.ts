export interface IPurchaseOrderItem {
  id: number;
  purchaseOrderId: number;
  componentCode: string;
  componentName: string;
  packagingSize: number;
  noOfPacks: number;
  quantity: number;
  deliveryDate: Date;
  itemCost: number;
  uom?: string;
}
