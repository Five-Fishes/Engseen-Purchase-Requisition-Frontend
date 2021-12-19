export enum PurchaseRequisitionApprovalStatus {
  TO_CONFIRM,
  CONFIRMED,
  ISSUED,
}

const DISPLAY_TEXT_MAP = new Map<PurchaseRequisitionApprovalStatus, string>();
DISPLAY_TEXT_MAP.set(PurchaseRequisitionApprovalStatus.TO_CONFIRM, 'To be confirmed');
DISPLAY_TEXT_MAP.set(PurchaseRequisitionApprovalStatus.CONFIRMED, 'Confirmed');
DISPLAY_TEXT_MAP.set(PurchaseRequisitionApprovalStatus.ISSUED, 'Issued');

export function PurchaseRequisitionApprovalStatusDisplayText(key: PurchaseRequisitionApprovalStatus): string {
  const displayText = DISPLAY_TEXT_MAP.get(key);

  if (displayText) {
    return displayText;
  } else {
    throw new Error("Status's Display Text not defined. Please define status display text at function: PurchaseRequisitionApprovalStatusDisplayText");
  }
}
