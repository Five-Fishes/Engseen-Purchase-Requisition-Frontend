export enum PurchaseOrderReceiptItemStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  RECEIVED = 'RECEIVED',
}

const DISPLAY_TEXT_MAP = new Map<string, string>();
DISPLAY_TEXT_MAP.set(PurchaseOrderReceiptItemStatus.PENDING, 'Confirm');
DISPLAY_TEXT_MAP.set(PurchaseOrderReceiptItemStatus.CONFIRMED, 'Confirmed');
DISPLAY_TEXT_MAP.set(PurchaseOrderReceiptItemStatus.RECEIVED, 'Issued');

export function PurchaseOrderReceiptItemStatusDisplayText(key: PurchaseOrderReceiptItemStatus): string {
  const displayText = DISPLAY_TEXT_MAP.get(key.toString());

  if (displayText) {
    return displayText;
  } else {
    throw new Error("Status's Display Text not defined. Please define status display text at function: PurchaseOrderReceiptItemStatusDisplayText");
  }
}
