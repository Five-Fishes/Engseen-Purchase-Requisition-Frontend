import { IPurchaseApprovalOrder } from "@dto/i-purchase-approval-order.dto";
import { IPurchaseOrder } from "@dto/i-purchase-order.dto";
import { useState } from "react";
import { Button } from "antd";
import CLONING_LIB from "@utils/cloning/cloning-lib-wrapper";
import { convertToLocalString } from "@utils/date-time/date-time-format";

interface IPurchaseOrderProps {
  setSelectedPurchaseApprovalOrder: (submissionRecord: IPurchaseApprovalOrder) => void;
  purchaseApprovalOrders: IPurchaseApprovalOrder[];
  setFilteredPurchaseOrders: (purchaseOrders: IPurchaseOrder[]) => void;
}

const PurchaseOrderBrowser: React.FC<IPurchaseOrderProps> = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { purchaseApprovalOrders } = props;

  return (
    <>
      <div className="text-center d-flex flex-column py-2" style={{ overflowY: "scroll"}}>
        {purchaseApprovalOrders &&
          purchaseApprovalOrders.map((purchaseApprovalOrder, index) => {
            return (
              <Button
                key={`purchase-order-date-${index}`}
                type={selectedIndex === index ? "primary" : "default"}
                shape="round"
                className="m-2"
                size="large"
                onClick={() => {
                  setSelectedIndex(index);
                  const deepCopy: IPurchaseApprovalOrder = CLONING_LIB.deepClone(purchaseApprovalOrder);
                  props.setSelectedPurchaseApprovalOrder(deepCopy);
                  props.setFilteredPurchaseOrders(deepCopy.purchaseOrders);
                }}
              >
                {convertToLocalString(purchaseApprovalOrder.createdDate)}
              </Button>
            );
          })}
      </div>
    </>
  );
  
};

export default PurchaseOrderBrowser;
