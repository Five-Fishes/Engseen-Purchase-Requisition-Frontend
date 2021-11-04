import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { IPurchaseRequisitionRequest } from "@dto/i-purchase-requisition-request.dto";
import { IPurchaseRequisitionTemplate } from "@dto/i-purchase-requisition-template.dto";

const PURCHASE_REQUISITION_REQUEST: string = "purchase-requisition/request";
const PURCHASE_REQUISITION_TEMPLATE: string = "purchase-requisition/template";

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

mock.onGet(PURCHASE_REQUISITION_TEMPLATE).reply<IPurchaseRequisitionTemplate[]>(200, [{
  id: 1,
  templateName: "Template A",
  templateItems: [{
    id: 1,
    componentCode: "DBECO",
    componentName: "Disperse Black ECO",
    vendorId: "BLP",
    vendorName: "BLP Sdn Bhd",
    packagingSize: 25,
    sequence: 1,
  },
  {
    id: 2,
    componentCode: "DBECO",
    componentName: "Disperse Black ECO",
    vendorId: "DyeChem",
    vendorName: "DyeChem Sdn Bhd",
    packagingSize: 30,
    sequence: 2,
  },
  {
    id: 3,
    componentCode: "ECO",
    componentName: "Black ECO",
    vendorId: "BLP",
    vendorName: "BLP Sdn Bhd",
    packagingSize: 20,
    sequence: 3,
  }]
}]);

export async function createPurchaseReqiosition(purchaseRequisitionRequest: IPurchaseRequisitionRequest) {
  return await axios.post<IPurchaseRequisitionRequest>(PURCHASE_REQUISITION_REQUEST, purchaseRequisitionRequest);
}

export async function getPurchaseRequisitionTemplateList() {
  return await axios.get<IPurchaseRequisitionTemplate[]>(PURCHASE_REQUISITION_TEMPLATE);
}
