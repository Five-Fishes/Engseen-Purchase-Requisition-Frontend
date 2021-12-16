export interface IPurchaseRequisitionRequestItem {
  id?: number
  componentCode: number
  componentName: string
  vendorName: string
  stockBalance: number
  packagingSize: number
  noOfPacks: number
  quantity: number
  deliveryDate: Date
}
