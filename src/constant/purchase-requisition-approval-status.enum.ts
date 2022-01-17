export enum PurchaseRequisitionApprovalStatus {
  TO_CONFIRM,
  CONFIRMED,
  ISSUED,
}

const DISPLAY_TEXT_MAP = new Map<string, string>();
DISPLAY_TEXT_MAP.set(PurchaseRequisitionApprovalStatus[PurchaseRequisitionApprovalStatus.TO_CONFIRM], 'To be confirmed');
DISPLAY_TEXT_MAP.set(PurchaseRequisitionApprovalStatus[PurchaseRequisitionApprovalStatus.CONFIRMED], 'Confirmed');
DISPLAY_TEXT_MAP.set(PurchaseRequisitionApprovalStatus[PurchaseRequisitionApprovalStatus.ISSUED], 'Issued');

export function PurchaseRequisitionApprovalStatusDisplayText(key: PurchaseRequisitionApprovalStatus): string {
  console.log(key.toString());
  console.log(PurchaseRequisitionApprovalStatus.CONFIRMED);
  console.log(PurchaseRequisitionApprovalStatus.CONFIRMED.toString());
  console.log(DISPLAY_TEXT_MAP);
  const displayText = DISPLAY_TEXT_MAP.get(key.toString());

  if (displayText) {
    return displayText;
  } else {
    throw new Error("Status's Display Text not defined. Please define status display text at function: PurchaseRequisitionApprovalStatusDisplayText");
  }
}
