import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { IPurchaseRequisitionRequest } from "@dto/i-purchase-requisition-request.dto";
import { IPurchaseRequisitionTemplate } from "@dto/i-purchase-requisition-template.dto";

const PURCHASE_REQUISITION_TEMPLATE: string = "purchase-requisition/template";

const mock = new MockAdapter(axios);

mock.onPost(PURCHASE_REQUISITION_TEMPLATE).reply<IPurchaseRequisitionTemplate>(200, {
  id: 1,
  templateName: "template 1",
  templateItems: [
    {
      id: 1,
      sequence: 1,
      componentCode: "AAA",
      componentName: "Component AAA",
      vendorId: "VA",
      vendorName: "Vendor A",
      packagingSize: 100,
    },
    {
      id: 2,
      sequence: 2,
      componentCode: "BBB",
      componentName: "Component BBB",
      vendorId: "VA",
      vendorName: "Vendor A",
      packagingSize: 100,
    },
    {
      id: 3,
      sequence: 3,
      componentCode: "CCC",
      componentName: "Component CCC",
      vendorId: "VA",
      vendorName: "Vendor A",
      packagingSize: 100,
    },
    {
      id: 4,
      sequence: 4,
      componentCode: "DDD",
      componentName: "Component DDD",
      vendorId: "VA",
      vendorName: "Vendor A",
      packagingSize: 100,
    },
  ],
});

mock.onGet(PURCHASE_REQUISITION_TEMPLATE).reply<IPurchaseRequisitionTemplate[]>(200, [
  {
    id: 1,
    templateName: "template 1",
    templateItems: [
      {
        id: 1,
        sequence: 1,
        componentCode: "AAA",
        componentName: "Component AAA",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 2,
        sequence: 2,
        componentCode: "BBB",
        componentName: "Component BBB",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 3,
        sequence: 3,
        componentCode: "CCC",
        componentName: "Component CCC",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 4,
        sequence: 4,
        componentCode: "DDD",
        componentName: "Component DDD",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 5,
        sequence: 5,
        componentCode: "DDD",
        componentName: "Component DDD",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 6,
        sequence: 6,
        componentCode: "DDD",
        componentName: "Component DDD",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 7,
        sequence: 7,
        componentCode: "DDD",
        componentName: "Component DDD",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 8,
        sequence: 8,
        componentCode: "DDD",
        componentName: "Component DDD",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 9,
        sequence: 9,
        componentCode: "DDD",
        componentName: "Component DDD",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 10,
        sequence: 10,
        componentCode: "DDD",
        componentName: "Component DDD",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
    ],
  },
  {
    id: 1,
    templateName: "template 1",
    templateItems: [
      {
        id: 1,
        sequence: 1,
        componentCode: "AAA",
        componentName: "Component AAA",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 2,
        sequence: 2,
        componentCode: "BBB",
        componentName: "Component BBB",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 3,
        sequence: 3,
        componentCode: "CCC",
        componentName: "Component CCC",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 4,
        sequence: 4,
        componentCode: "DDD",
        componentName: "Component DDD",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
    ],
  },
  {
    id: 1,
    templateName: "template 1",
    templateItems: [
      {
        id: 1,
        sequence: 1,
        componentCode: "AAA",
        componentName: "Component AAA",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 2,
        sequence: 2,
        componentCode: "BBB",
        componentName: "Component BBB",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 3,
        sequence: 3,
        componentCode: "CCC",
        componentName: "Component CCC",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 4,
        sequence: 4,
        componentCode: "DDD",
        componentName: "Component DDD",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
    ],
  },
  {
    id: 1,
    templateName: "template 1",
    templateItems: [
      {
        id: 1,
        sequence: 1,
        componentCode: "AAA",
        componentName: "Component AAA",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 2,
        sequence: 2,
        componentCode: "BBB",
        componentName: "Component BBB",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 3,
        sequence: 3,
        componentCode: "CCC",
        componentName: "Component CCC",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 4,
        sequence: 4,
        componentCode: "DDD",
        componentName: "Component DDD",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
    ],
  },
  {
    id: 1,
    templateName: "template 1",
    templateItems: [
      {
        id: 1,
        sequence: 1,
        componentCode: "AAA",
        componentName: "Component AAA",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 2,
        sequence: 2,
        componentCode: "BBB",
        componentName: "Component BBB",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 3,
        sequence: 3,
        componentCode: "CCC",
        componentName: "Component CCC",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 4,
        sequence: 4,
        componentCode: "DDD",
        componentName: "Component DDD",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
    ],
  },
  {
    id: 1,
    templateName: "template 1",
    templateItems: [
      {
        id: 1,
        sequence: 1,
        componentCode: "AAA",
        componentName: "Component AAA",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 2,
        sequence: 2,
        componentCode: "BBB",
        componentName: "Component BBB",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 3,
        sequence: 3,
        componentCode: "CCC",
        componentName: "Component CCC",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 4,
        sequence: 4,
        componentCode: "DDD",
        componentName: "Component DDD",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
    ],
  },
  {
    id: 1,
    templateName: "template 1",
    templateItems: [
      {
        id: 1,
        sequence: 1,
        componentCode: "AAA",
        componentName: "Component AAA",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 2,
        sequence: 2,
        componentCode: "BBB",
        componentName: "Component BBB",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 3,
        sequence: 3,
        componentCode: "CCC",
        componentName: "Component CCC",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 4,
        sequence: 4,
        componentCode: "DDD",
        componentName: "Component DDD",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
    ],
  },
  {
    id: 1,
    templateName: "template 1",
    templateItems: [
      {
        id: 1,
        sequence: 1,
        componentCode: "AAA",
        componentName: "Component AAA",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 2,
        sequence: 2,
        componentCode: "BBB",
        componentName: "Component BBB",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 3,
        sequence: 3,
        componentCode: "CCC",
        componentName: "Component CCC",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 4,
        sequence: 4,
        componentCode: "DDD",
        componentName: "Component DDD",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
    ],
  },
  {
    id: 1,
    templateName: "template 1",
    templateItems: [
      {
        id: 1,
        sequence: 1,
        componentCode: "AAA",
        componentName: "Component AAA",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 2,
        sequence: 2,
        componentCode: "BBB",
        componentName: "Component BBB",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 3,
        sequence: 3,
        componentCode: "CCC",
        componentName: "Component CCC",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 4,
        sequence: 4,
        componentCode: "DDD",
        componentName: "Component DDD",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
    ],
  },
  {
    id: 1,
    templateName: "template 1",
    templateItems: [
      {
        id: 1,
        sequence: 1,
        componentCode: "AAA",
        componentName: "Component AAA",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 2,
        sequence: 2,
        componentCode: "BBB",
        componentName: "Component BBB",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 3,
        sequence: 3,
        componentCode: "CCC",
        componentName: "Component CCC",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
      {
        id: 4,
        sequence: 4,
        componentCode: "DDD",
        componentName: "Component DDD",
        vendorId: "VA",
        vendorName: "Vendor A",
        packagingSize: 100,
      },
    ],
  },
]);

export async function createPurchaseReqiosition(purchaseRequisitionRequest: IPurchaseRequisitionRequest) {
  return await axios.post<IPurchaseRequisitionTemplate>(PURCHASE_REQUISITION_TEMPLATE, purchaseRequisitionRequest);
}

export async function getPurchaseRequisitionTemplate() {
  return await axios.get<IPurchaseRequisitionTemplate[]>(PURCHASE_REQUISITION_TEMPLATE);
}
