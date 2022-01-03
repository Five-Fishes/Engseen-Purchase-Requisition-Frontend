import { IPurchaseRequisitionRequest } from '@dto/i-purchase-requisition-request.dto';
import { useState } from 'react';
import { Button } from 'antd';
import CLONING_LIB from '@utils/cloning/cloning-lib-wrapper';
import { convertToLocalString } from '@utils/date-time/date-time-format';
import { IPurchaseRequisitionRequestItem } from '@dto/i-purchase-requisition-request-item.dto';
import { APP_HEADER_HEIGHT } from '@constant/display/header.constant';
import { APP_CONTENT_MARGIN } from '@constant/display/content.constant';
import { PURCHASE_REQUISITION_SUBMISSION_REMARKS_HEIGHT, PURCHASE_REQUISITION_SUBMISSION_TOP_TOOLS_HEIGHT } from '@constant/display/purcahse-requisition-submission.constant';
import { IWindowSize, useWindowResized } from '@hook/window-resized.hook';

interface IPurchaseRequisitionSubmissionProps {
  setSelectedSubmissionRecord: (submissionRecord: IPurchaseRequisitionRequest) => void;
  purchaseRequisitionSubmissios: IPurchaseRequisitionRequest[];
  setFilteredSubmissionsItems: (submissionItems: IPurchaseRequisitionRequestItem[]) => void;
  setLoading?: (loading: boolean) => void;
}

const PurchaseRequisitionSubmissionBrowser: React.FC<IPurchaseRequisitionSubmissionProps> = (props) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const { purchaseRequisitionSubmissios } = props;
  const PURCHASE_REQUISITION_SUBMISSION_BROWSER_HEIGHT_CONSTRAINT: number =
    APP_HEADER_HEIGHT + APP_CONTENT_MARGIN + PURCHASE_REQUISITION_SUBMISSION_TOP_TOOLS_HEIGHT + PURCHASE_REQUISITION_SUBMISSION_REMARKS_HEIGHT;
  const windowSize: IWindowSize = useWindowResized();

  return (
    <>
      <div className="scrollable-menu d-flex flex-column" style={{ height: `${windowSize.height - PURCHASE_REQUISITION_SUBMISSION_BROWSER_HEIGHT_CONSTRAINT}px` }}>
        {purchaseRequisitionSubmissios &&
          purchaseRequisitionSubmissios.map((submission, index) => {
            return (
              <Button
                key={`submission-date-${index}`}
                type={selectedIndex === index ? 'primary' : 'default'}
                shape="round"
                className="m-1 px-1"
                size="large"
                onClick={() => {
                  props.setLoading && props.setLoading(true);
                  setSelectedIndex(index);
                  const deepCopy: IPurchaseRequisitionRequest = CLONING_LIB.deepClone(submission);
                  props.setSelectedSubmissionRecord(deepCopy);
                  props.setFilteredSubmissionsItems(deepCopy.purchaseRequisitionRequestItems);
                  setTimeout(function () {
                    props.setLoading && props.setLoading(false);
                  }, 500);
                }}
              >
                <span style={{ fontSize: '10px' }}>{convertToLocalString(submission.createdDate)}</span>
              </Button>
            );
          })}
      </div>
    </>
  );
};

export default PurchaseRequisitionSubmissionBrowser;
