import { IPurchaseRequisitionRequest } from '@dto/i-purchase-requisition-request.dto';
import { useState } from 'react';
import { Button } from 'antd';
import CLONING_LIB from '@utils/cloning/cloning-lib-wrapper';
import { convertToLocalString } from '@utils/date-time/date-time-format';
import { IPurchaseRequisitionRequestItem } from '@dto/i-purchase-requisition-request-item.dto';

interface IPurchaseRequisitionSubmissionProps {
  setSelectedSubmissionRecord: (submissionRecord: IPurchaseRequisitionRequest) => void;
  purchaseRequisitionSubmissios: IPurchaseRequisitionRequest[];
  setFilteredSubmissionsItems: (submissionItems: IPurchaseRequisitionRequestItem[]) => void;
  setLoading?: (loading: boolean) => void;
}

const PurchaseRequisitionSubmissionBrowser: React.FC<IPurchaseRequisitionSubmissionProps> = (props) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const { purchaseRequisitionSubmissios } = props;
  return (
    <>
      <div className="scrollable-menu d-flex flex-column">
        {purchaseRequisitionSubmissios &&
          purchaseRequisitionSubmissios.map((submission, index) => {
            return (
              <Button
                key={`submission-date-${index}`}
                type={selectedIndex === index ? 'primary' : 'default'}
                shape="round"
                className="m-1 px-4"
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
                {convertToLocalString(submission.createdDate)}
              </Button>
            );
          })}
      </div>
    </>
  );
};

export default PurchaseRequisitionSubmissionBrowser;
