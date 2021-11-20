import { IPurchaseOrder } from "@dto/i-purchase-order.dto";
import { useState } from "react";
import { Button, Input } from "antd";
import CLONING_LIB from "@utils/cloning/cloning-lib-wrapper";
import { convertToLocalString } from "@utils/date-time/date-time-format";

interface IPurchaseOrderProps {
  setSelectedPurchaseOrder: (submissionRecord: IPurchaseOrder) => void;
  purchaseOrders: IPurchaseOrder[];
}

const PurchaseOrderBrowser: React.FC<IPurchaseOrderProps> = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { purchaseOrders } = props;
  
  return (
    <>
      <div className="text-center d-flex flex-column py-2" style={{ overflowY: "scroll", maxHeight: "85%" }}>
        {purchaseOrders &&
          purchaseOrders.map((purchaseOrder, index) => {
            return (
              <Button
                key={`purchase-order-date-${index}`}
                type={selectedIndex === index ? "primary" : "default"}
                shape="round"
                className="m-2"
                size="large"
                onClick={() => {
                  setSelectedIndex(index);
                  const deepCopy: IPurchaseOrder = CLONING_LIB.deepClone(purchaseOrder);
                  props.setSelectedPurchaseOrder(deepCopy);
                }}
              >
                {convertToLocalString(purchaseOrder.revisionDate)}
              </Button>
            );
          })}
      </div>
    </>
  );
  
};

export default PurchaseOrderBrowser;
