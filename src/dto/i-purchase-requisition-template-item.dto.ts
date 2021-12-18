export interface IPurchaseRequisitionTemplateItem {
  id: number;
  sequence: number;
  componentCode: string;
  componentName: string;
  vendorId: string;
  vendorName: string;
  packagingSize: number;
  /**
   * - Date current item to be delivered
   * - Optional field
   * - Used while constructing request
   */
  deliveryDate?: Date;
  /**
   * - Quantity(No. of Packs) current item to be delivered
   * - Optional field
   * - Used while constructing request
   */
   quantity?: number;
}
