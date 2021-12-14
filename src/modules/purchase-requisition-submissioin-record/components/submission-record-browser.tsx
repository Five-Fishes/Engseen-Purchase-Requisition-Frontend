import { IPurchaseRequisitionRequest } from "@dto/i-purchase-requisition-request.dto";
import { useState } from "react";
import { Button, Input } from "antd";
import CLONING_LIB from "@utils/cloning/cloning-lib-wrapper";
import { convertToLocalString } from "@utils/date-time/date-time-format";
import { IPurchaseRequisitionRequestItem } from "@dto/i-purchase-requisition-request-item.dto";

interface IPurchaseRequisitionSubmissionProps {
  setSelectedSubmissionRecord: (submissionRecord: IPurchaseRequisitionRequest) => void;
  purchaseRequisitionSubmissios: IPurchaseRequisitionRequest[];
  setFilteredSubmissionsItems: (submissionItems: IPurchaseRequisitionRequestItem[]) => void;
}

const PurchaseRequisitionSubmissionBrowser: React.FC<IPurchaseRequisitionSubmissionProps> = (props) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [selectedRemarks, setSelectedRemarks] = useState<string>();
  const { purchaseRequisitionSubmissios } = props;
  return (
    <>
      <div className="text-center d-flex flex-column py-2" style={{ overflowY: "scroll", maxHeight: "85%", width: "max-content" }}>
        {purchaseRequisitionSubmissios &&
          purchaseRequisitionSubmissios.map((submission, index) => {
            return (
              <Button
                key={`submission-date-${index}`}
                type={selectedIndex === index ? "primary" : "default"}
                shape="round"
                className="m-1 px-4"
                size="large"
                onClick={() => {
                  setSelectedIndex(index);
                  setSelectedRemarks(submission.remarks);
                  const deepCopy: IPurchaseRequisitionRequest = CLONING_LIB.deepClone(submission);
                  props.setSelectedSubmissionRecord(deepCopy);
                  props.setFilteredSubmissionsItems(deepCopy.purchaseRequisitionRequestItems);
                }}
              >
                {convertToLocalString(submission.createdDate)}
              </Button>
            );
          })}
      </div>
      <div className="fixed-bottom mx-4 remarks-box pb-1">
        <Input.TextArea readOnly className="h-100"
          value={selectedRemarks == null ? "Remarks: " : "Remarks: \n" + selectedRemarks} />
      </div>
    </>
  );
};

export default PurchaseRequisitionSubmissionBrowser;
