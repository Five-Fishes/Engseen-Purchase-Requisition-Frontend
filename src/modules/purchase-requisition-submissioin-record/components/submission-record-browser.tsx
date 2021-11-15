import { getPurchaseRequisitionRequest } from "@api/purchase-requisition-request.api";
import { ApiResponseStatus } from "@constant/api-status";
import { IPurchaseRequisitionRequest } from "@dto/i-purchase-requisition-request.dto";
import { useEffect, useState } from "react";
import { Button } from "antd";
import CLONING_LIB from "@utils/cloning/cloning-lib-wrapper";
import { Sort } from "@constant/sort.enum";
import { convertToLocalString } from "@utils/date-time/date-time-format";

interface IPurchaseRequisitionSubmissionProps {
  setSelectedSubmissionRecord: (submissionRecord: IPurchaseRequisitionRequest) => void;
}

const PurchaseRequisitionSubmissionBrowser: React.FC<IPurchaseRequisitionSubmissionProps> = (props) => {
  const [purchaseRequisitionSubmissios, setPurchaseRequisitionSubmissions] = useState<IPurchaseRequisitionRequest[]>();
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    const getSubmissions = async () => {
      const apiResponse = await getPurchaseRequisitionRequest(new Date(), new Date(), Sort.ASC);

      if (apiResponse && apiResponse.status === ApiResponseStatus.SUCCESS) {
        setPurchaseRequisitionSubmissions(apiResponse.data);
      }
    };

    getSubmissions();
  }, []);

  return (
    <>
      <div>
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
