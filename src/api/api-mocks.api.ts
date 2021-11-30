import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { PURCHASE_REQUISITION_REQUEST, PURCHASE_REQUISITION_REQUEST_REGEX, PURCHASE_REQUISITION_TEMPLATE, PURCHASE_ORDER, PURCHASE_ORDER_REGEX } from "@constant/api-endpoints";
import { IPurchaseRequisitionRequest } from "@dto/i-purchase-requisition-request.dto";
import { IPurchaseRequisitionTemplate } from "@dto/i-purchase-requisition-template.dto";
import { IPurchaseApprovalOrder } from "@dto/i-purchase-approval-order.dto";

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

mock.onPost(PURCHASE_ORDER).reply<IPurchaseApprovalOrder>(200, {
  id: 1,
  createdDate: new Date(),
  purchaseOrders: [{
    id: 1,
    purchaseRequisitionApprovalId: 1,
    email: "vendor@email.com",
    vendorId: "BLP",
    revisionDate: new Date(),
    poNumber: "PO-3729",
    purchaseOrderItems: [
      {
        id: 1,
        componentCode: "COMP-D",
        componentName: "Component DDD",
        packagingSize: 100,
        noOfPacks: 10,
        quantity: 1000,
        deliveryDate: new Date(),
        purchaseOrderId: 1,
        itemCost: 250
      },
    ],
    emailed: true,
    downloaded: true,
  }]
});

mock.onGet(PURCHASE_ORDER_REGEX).reply<IPurchaseApprovalOrder[]>(200, [
  {
    id: 1,
    createdDate: new Date(),
    purchaseOrders: [{
      id: 1,
      purchaseRequisitionApprovalId: 1,
      email: "vendorA@email.com",
      vendorId: "VEN-A",
      revisionDate: new Date(),
      poNumber: "PO-0173",
      purchaseOrderItems: [
        {
          id: 1,
          componentCode: "COMA",
          componentName: "Component AAA",
          packagingSize: 100,
          noOfPacks: 10,
          quantity: 1000,
          deliveryDate: new Date(),
          purchaseOrderId: 1,
          itemCost: 250
        },
      ],
      emailed: false,
      downloaded: false,
    }]
  },
  {
    id: 2,
    createdDate: new Date(),
    purchaseOrders: [{
      id: 2,
      purchaseRequisitionApprovalId: 1,
      email: "vendorB@email.com",
      vendorId: "VEN-B",
      revisionDate: new Date(),
      poNumber: "PO-3517",
      purchaseOrderItems: [
        {
          id: 2,
          componentCode: "COM-B",
          componentName: "Component BBB",
          packagingSize: 90,
          noOfPacks: 10,
          quantity: 900,
          deliveryDate: new Date(),
          purchaseOrderId: 2,
          itemCost: 250
        },
      ],
      emailed: false,
      downloaded: false,
    }]
  },
  {
    id: 3,
    createdDate: new Date(),
    purchaseOrders: [{
      id: 3,
      purchaseRequisitionApprovalId: 1,
      email: "vendorC@email.com",
      vendorId: "VEN-C",
      revisionDate: new Date(),
      poNumber: "PO-1523",
      purchaseOrderItems: [
        {
          id: 3,
          componentCode: "COM-C",
          componentName: "Component CCC",
          packagingSize: 80,
          noOfPacks: 10,
          quantity: 800,
          deliveryDate: new Date(),
          purchaseOrderId: 3,
          itemCost: 250
        },
      ],
      emailed: false,
      downloaded: false,
    }]
  },
  {
    id: 4,
    createdDate: new Date(),
    purchaseOrders: [{
      id: 4,
      purchaseRequisitionApprovalId: 1,
      email: "vendorD@email.com",
      vendorId: "VEN-D",
      revisionDate: new Date(),
      poNumber: "PO-1233",
      purchaseOrderItems: [
        {
          id: 4,
          componentCode: "COM-D",
          componentName: "Component DDD",
          packagingSize: 70,
          noOfPacks: 10,
          quantity: 700,
          deliveryDate: new Date(),
          purchaseOrderId: 4,
          itemCost: 250
        },
      ],
      emailed: false,
      downloaded: false,
    }]
  },
  {
    id: 5,
    createdDate: new Date("2021-11-10"),
    purchaseOrders: [{
      id: 5,
      purchaseRequisitionApprovalId: 1,
      email: "vendorE@email.com",
      vendorId: "VEN-E",
      revisionDate: new Date("2021-11-10"),
      poNumber: "PO-2101",
      purchaseOrderItems: [
        {
          id: 1,
          componentCode: "COM-E",
          componentName: "Component EEE",
          packagingSize: 60,
          noOfPacks: 10,
          quantity: 600,
          deliveryDate: new Date(),
          purchaseOrderId: 5,
          itemCost: 250
        },
      ],
      emailed: false,
      downloaded: false,
    }]
  },
  {
    id: 6,
    createdDate: new Date("2021-11-03"),
    purchaseOrders: [{
      id: 6,
      purchaseRequisitionApprovalId: 1,
      email: "vendorF@email.com",
      vendorId: "VEN-F",
      revisionDate: new Date("2021-11-03"),
      poNumber: "PO-3734",
      purchaseOrderItems: [
        {
          id: 1,
          componentCode: "COM-F",
          componentName: "Component FFF",
          packagingSize: 50,
          noOfPacks: 5,
          quantity: 250,
          deliveryDate: new Date(),
          purchaseOrderId: 6,
          itemCost: 250
        },
      ],
      emailed: true,
      downloaded: true,
    }]
  },
  {
    id: 7,
    createdDate: new Date("2021-11-02"),
    purchaseOrders: [{
      id: 7,
      purchaseRequisitionApprovalId: 1,
      email: "vendorG@email.com",
      vendorId: "VEN-G",
      revisionDate: new Date("2021-11-02"),
      poNumber: "PO-32649",
      purchaseOrderItems: [
        {
          id: 1,
          componentCode: "COM-G",
          componentName: "Component GGG",
          packagingSize: 40,
          noOfPacks: 5,
          quantity: 200,
          deliveryDate: new Date(),
          purchaseOrderId: 7,
          itemCost: 250
        },
      ],
      emailed: true,
      downloaded: true,
    }]
  },
  {
    id: 8,
    createdDate: new Date("2021-11-01"),
    purchaseOrders: [{
      id: 8,
      purchaseRequisitionApprovalId: 1,
      email: "vendorH@email.com",
      vendorId: "VEN-H",
      revisionDate: new Date("2021-11-01"),
      poNumber: "PO-17631",
      purchaseOrderItems: [
        {
          id: 1,
          componentCode: "COM-H",
          componentName: "Component HHH",
          packagingSize: 45,
          noOfPacks: 5,
          quantity: 225,
          deliveryDate: new Date(),
          purchaseOrderId: 8,
          itemCost: 250
        },
      ],
      emailed: true,
      downloaded: true,
    }]
  }
]);

export default mock;