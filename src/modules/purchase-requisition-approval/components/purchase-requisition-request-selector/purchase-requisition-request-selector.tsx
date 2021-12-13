import { Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

import { PurchaseRequisitionApprovalStatus } from "@constant/purchase-requisition-approval-status.enum";
import { IPurchaseRequisitionApprovalItem } from "@dto/i-purchase-requisition-approval-item.dto";
import { IPurchaseRequisitionApproval } from "@dto/i-purchase-requisition-approval.dto";

interface IPurchaseRequisitionSelectorProps {
  purcahseRequisitionApprovalList?: IPurchaseRequisitionApproval[];
  setPurcahseRequisitionApprovalList: (purcahseRequisitionApprovalList: IPurchaseRequisitionApproval[]) => void;
  selectedPurcahseRequisitionApproval?: IPurchaseRequisitionApproval;
  setSelectedPurcahseRequisitionApproval: (purcahseRequisitionApprovalList: IPurchaseRequisitionApproval) => void;
}

const PurchaseRequisitionSelector: React.FC<IPurchaseRequisitionSelectorProps> = (props) => {
  if (props.purcahseRequisitionApprovalList) {
    const APPROVAL_LIST: IPurchaseRequisitionApproval[] = props.purcahseRequisitionApprovalList;
    const setSelectedPurcahseRequisitionApproval = props.setSelectedPurcahseRequisitionApproval;
    const isAllApprovalItemsIssued: (purchaseRequisitionApprovalItems: IPurchaseRequisitionApprovalItem[]) => boolean = (purchaseRequisitionApprovalItems) => {
      return purchaseRequisitionApprovalItems.every((item) => item.status === PurchaseRequisitionApprovalStatus.ISSUED);
    };

    return (
      <>
        <div className="d-flex flex-column scrollable-menu" style={{ maxHeight: "480px" }}>
          {APPROVAL_LIST.map((purchaseRequisitionApproval, index) => (
            <Button
              className="m-2"
              shape="round"
              size="large"
              key={index}
              onClick={() => {
                setSelectedPurcahseRequisitionApproval(purchaseRequisitionApproval);
              }}
            >
              {new Date(purchaseRequisitionApproval.createdDate).toDateString()}{" "}
              {isAllApprovalItemsIssued(purchaseRequisitionApproval.purchaseRequisitionApprovalItems) && <CheckCircleOutlined style={{ color: "#22A70C", transform: "translateY(-3px)" }} />}
            </Button>
          ))}
        </div>
      </>
    );
  } else {
    return <div>No data</div>;
  }
};

export default PurchaseRequisitionSelector;
