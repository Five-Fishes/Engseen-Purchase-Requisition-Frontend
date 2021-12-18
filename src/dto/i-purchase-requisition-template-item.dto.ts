export interface IPurchaseRequisitionTemplateItem {
  id: number;
  sequence: number;
  componentCode: string;
  componentName: string;
  vendorId: string;
  vendorName: string;
  packagingSize: number;
  /**
   * Optional field, used while constructing request
   */
  deliveryDate?: Date;
}
