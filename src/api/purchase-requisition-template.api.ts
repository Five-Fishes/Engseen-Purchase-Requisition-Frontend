import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { IPurchaseRequisitionRequest } from "../dto/i-purchase-requisition-request.dto";

const PURCHASE_REQUISITION_REQUEST: string = "purchase-requisition/request";

const mock = new MockAdapter(axios);

mock.onPost(PURCHASE_REQUISITION_REQUEST).reply<IPurchaseRequisitionRequest>(200, {
  id: 1,
  createdDate: new Date(),
  templateId: 1,
  purchaseRequisitionRequestItems: [
    {
      componentCode: 1,
      componentName: "abc",
      vendorName: "abc",
      stockBalance: 100,
      packagingSize: 100,
      noOfPacks: 100,
      quantity: 10000,
      deliveryDate: new Date(),
    },
  ],
  remarks: "abc",
});

export async function createPurchaseReqiosition(purchaseRequisitionRequest: IPurchaseRequisitionRequest) {
  return await axios.post<IPurchaseRequisitionRequest>(PURCHASE_REQUISITION_REQUEST, purchaseRequisitionRequest);
}
