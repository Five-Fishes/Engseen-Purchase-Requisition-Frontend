import { IPurchaseOrder } from '@dto/i-purchase-order.dto'

export const genereateIndex = (purchaseOrder: IPurchaseOrder) => {
  const searchIndex = '' + (purchaseOrder.vendorId || '') + (purchaseOrder.poNumber.trim() || '')
  return searchIndex.replace(/\s+/g, '').toLowerCase()
}
