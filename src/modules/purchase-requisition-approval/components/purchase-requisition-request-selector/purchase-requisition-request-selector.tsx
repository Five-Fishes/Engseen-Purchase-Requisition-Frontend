import { Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

import { PurchaseRequisitionApprovalStatus } from '@constant/purchase-requisition-approval-status.enum';
import { IPurchaseRequisitionApprovalItem } from '@dto/i-purchase-requisition-approval-item.dto';
import { IPurchaseRequisitionApproval } from '@dto/i-purchase-requisition-approval.dto';
import { convertToLocalString } from '@utils/date-time/date-time-format';

interface IPurchaseRequisitionSelectorProps {
  purcahseRequisitionApprovalList?: IPurchaseRequisitionApproval[];
  setPurcahseRequisitionApprovalList: (purcahseRequisitionApprovalList: IPurchaseRequisitionApproval[]) => void;
  selectedPurcahseRequisitionApproval?: IPurchaseRequisitionApproval;
  setSelectedPurcahseRequisitionApproval: (purcahseRequisitionApprovalList: IPurchaseRequisitionApproval) => void;
  setLoading?: (loading: boolean) => void;
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
        <div className="d-flex flex-column scrollable-menu" style={{ maxHeight: '480px' }}>
          {APPROVAL_LIST.map((purchaseRequisitionApproval, index) => (
            <Button
              className="m-2"
              shape="round"
              size="large"
              key={index}
              onClick={() => {
                props.setLoading && props.setLoading(true);
                setSelectedPurcahseRequisitionApproval(purchaseRequisitionApproval);
                setTimeout(function () {
                  props.setLoading && props.setLoading(false);
                }, 500);
              }}
            >
              {convertToLocalString(purchaseRequisitionApproval.createdDate)}{' '}
              {isAllApprovalItemsIssued(purchaseRequisitionApproval.purchaseRequisitionApprovalItems) && <CheckCircleOutlined style={{ color: '#22A70C', transform: 'translateY(-3px)' }} />}
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
