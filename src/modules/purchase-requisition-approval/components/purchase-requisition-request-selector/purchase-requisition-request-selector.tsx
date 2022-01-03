import { Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

import { PurchaseRequisitionApprovalStatus } from '@constant/purchase-requisition-approval-status.enum';
import { IPurchaseRequisitionApprovalItem } from '@dto/i-purchase-requisition-approval-item.dto';
import { IPurchaseRequisitionApproval } from '@dto/i-purchase-requisition-approval.dto';
import { convertToLocalString } from '@utils/date-time/date-time-format';
import { IWindowSize, useWindowResized } from '@hook/window-resized.hook';
import { APP_HEADER_HEIGHT } from '@constant/display/header.constant';
import { APP_CONTENT_MARGIN } from '@constant/display/content.constant';
import {
  PURCHASE_REQUISITION_APPROVAL_BOTTOM_TOOLS_HEIGHT,
  PURCHASE_REQUISITION_APPROVAL_TITLE_HEIGHT,
  PURCHASE_REQUISITION_APPROVAL_TOP_TOOLS_HEIGHT,
} from '@constant/display/purchase-requisition-approval.constant';
import { DIVIDER_HEIGHT } from '@constant/display/divider.constant';

interface IPurchaseRequisitionSelectorProps {
  purcahseRequisitionApprovalList?: IPurchaseRequisitionApproval[];
  setPurcahseRequisitionApprovalList: (purcahseRequisitionApprovalList: IPurchaseRequisitionApproval[]) => void;
  selectedPurchaseRequisitionApproval?: IPurchaseRequisitionApproval;
  setSelectedPurcahseRequisitionApproval: (purcahseRequisitionApprovalList: IPurchaseRequisitionApproval) => void;
  setLoading?: (loading: boolean) => void;
}

const PurchaseRequisitionSelector: React.FC<IPurchaseRequisitionSelectorProps> = (props) => {
  const windowSize: IWindowSize = useWindowResized();
  const PURCHASE_REQUISITION_APPROVAL_REQUEST_SELECTOR_HEIGHT_CONSTRAINT: number =
    APP_HEADER_HEIGHT +
    APP_CONTENT_MARGIN +
    PURCHASE_REQUISITION_APPROVAL_TITLE_HEIGHT +
    PURCHASE_REQUISITION_APPROVAL_TOP_TOOLS_HEIGHT +
    DIVIDER_HEIGHT +
    PURCHASE_REQUISITION_APPROVAL_BOTTOM_TOOLS_HEIGHT;

  if (props.purcahseRequisitionApprovalList) {
    const APPROVAL_LIST: IPurchaseRequisitionApproval[] = props.purcahseRequisitionApprovalList;
    const setSelectedPurcahseRequisitionApproval = props.setSelectedPurcahseRequisitionApproval;
    const isAllApprovalItemsIssued: (purchaseRequisitionApprovalItems: IPurchaseRequisitionApprovalItem[]) => boolean = (purchaseRequisitionApprovalItems) => {
      return purchaseRequisitionApprovalItems.every((item) => item.status === PurchaseRequisitionApprovalStatus.ISSUED);
    };

    return (
      <>
        <div className="d-flex flex-column scrollable-menu" style={{ height: `${windowSize.height - PURCHASE_REQUISITION_APPROVAL_REQUEST_SELECTOR_HEIGHT_CONSTRAINT}px` }}>
          {APPROVAL_LIST.map((purchaseRequisitionApproval, index) => (
            <Button
              type={purchaseRequisitionApproval.id === props.selectedPurchaseRequisitionApproval?.id ? 'primary' : 'default'}
              className="m-1 px-4"
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
