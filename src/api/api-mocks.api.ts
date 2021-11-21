import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { PURCHASE_REQUISITION_REQUEST, PURCHASE_REQUISITION_REQUEST_REGEX, PURCHASE_REQUISITION_TEMPLATE, PURCHASE_ORDER, PURCHASE_ORDER_REGEX } from "@constant/api-endpoints";
import { IPurchaseRequisitionRequest } from "@dto/i-purchase-requisition-request.dto";
import { IPurchaseRequisitionTemplate } from "@dto/i-purchase-requisition-template.dto";
import { IPurchaseOrder } from "@dto/i-purchase-order.dto";

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

mock.onGet(PURCHASE_REQUISITION_REQUEST_REGEX).reply<IPurchaseRequisitionRequest[]>(200, [
  {
    id: 1,
    createdDate: new Date("2022-01-01"),
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
  },
  {
    id: 2,
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
  },
  {
    id: 3,
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
  },
  {
    id: 4,
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
  },
  {
    id: 5,
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
  },
  {
    id: 6,
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
  },
  {
    id: 7,
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
  },
  {
    id: 8,
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
  },
  {
    id: 9,
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
  },
  {
    id: 10,
    createdDate: new Date("2021-11-01"),
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
  },
]);

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

mock.onPost(PURCHASE_ORDER).reply<IPurchaseOrder>(200, {
  id: 1,
  purchaseRequisitionApprovalId: 1,
  email: "vendor@email.com",
  vendorId: 1,
  revisionDate: new Date(),
  purchaseOrderItems: [
    {
      id: 1,
      componentCode: 1,
      componentName: "Component DDD",
      packagingSize: 100,
      noOfPacks: 10,
      quantity: 1000,
      deliveryDate: new Date(),
      purchaseOrderId: 1,
    },
  ],
  emailed: true,
  downloaded: true,
});

mock.onGet(PURCHASE_ORDER_REGEX).reply<IPurchaseOrder[]>(200, [
  {
    id: 1,
    purchaseRequisitionApprovalId: 1,
    email: "vendor@email.com",
    vendorId: 1,
    revisionDate: new Date(),
    purchaseOrderItems: [
      {
        id: 1,
        componentCode: 1,
        componentName: "Component AAA",
        packagingSize: 100,
        noOfPacks: 10,
        quantity: 1000,
        deliveryDate: new Date(),
        purchaseOrderId: 1,
      },
    ],
    emailed: false,
    downloaded: false,
  }
]);

export default mock;