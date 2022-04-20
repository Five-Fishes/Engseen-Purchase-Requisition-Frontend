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

  /**
   * Newly added fields below
   */
  // TODO: [LU] only disallow undefined after confirming exising usage is not affected
  openQuantity?: number;
  openQuantityPack?: number;
  orderQuantity?: number;
  orderQuantityPack?: number;
  poNumber?: string;
  receivedQuantity?: number;
  receivedQuantityPack?: number;
  receivingQuantity?: number;
  receivingQuantityPack?: number;
  remarks?: number;
  status?: string;
  uomPack?: number;
  vendorId?: string;
  vendorName?: string;
}
