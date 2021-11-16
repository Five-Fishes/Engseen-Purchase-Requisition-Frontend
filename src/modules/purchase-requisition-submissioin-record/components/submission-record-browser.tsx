import { IPurchaseRequisitionRequest } from "@dto/i-purchase-requisition-request.dto";
import { useState } from "react";
import { Button } from "antd";
import CLONING_LIB from "@utils/cloning/cloning-lib-wrapper";
import { convertToLocalString } from "@utils/date-time/date-time-format";

interface IPurchaseRequisitionSubmissionProps {
  setSelectedSubmissionRecord: (submissionRecord: IPurchaseRequisitionRequest) => void;
  purchaseRequisitionSubmissios: IPurchaseRequisitionRequest[];
}

const PurchaseRequisitionSubmissionBrowser: React.FC<IPurchaseRequisitionSubmissionProps> = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { purchaseRequisitionSubmissios } = props;
  return (
    <>
      <div className="text-center d-flex flex-column py-2" style={{ overflowY: "scroll" }}>
        {purchaseRequisitionSubmissios &&
          purchaseRequisitionSubmissios.map((submission, index) => {
            return (
              <Button
                key={`submission-date-${index}`}
                type={selectedIndex === index ? "primary" : "default"}
                shape="round"
                className="m-2"
                size="large"
                onClick={() => {
                  setSelectedIndex(index);
                  const deepCopy: IPurchaseRequisitionRequest = CLONING_LIB.deepClone(submission);
                  props.setSelectedSubmissionRecord(deepCopy);
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
