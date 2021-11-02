import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createPurchaseReqiosition } from "../../../api/purchase-requisition-template.api";
import { IPurchaseRequisitionRequest } from "../../../dto/i-purchase-requisition-request.dto";

const NoMatch: React.FC = () => {
  useEffect(() => {
    const create = async () => {
      try {
        const res = await createPurchaseReqiosition({} as IPurchaseRequisitionRequest);
        console.log(res);
      } catch (error) {
        console.error(error);
      }  
    }
    create()
  }, []);

  const location = useLocation();

  return (
    <div>
      <h1>{location.pathname} is not available</h1>
    </div>
  );
};

export default NoMatch;
