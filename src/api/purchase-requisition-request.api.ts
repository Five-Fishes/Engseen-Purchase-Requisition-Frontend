import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { IPurchaseRequisitionRequest } from "@dto/i-purchase-requisition-request.dto";
import { Sort } from "@constant/sort.enum";
import { QueryParamsBuilder } from "@utils/api/query-params-builder";

const PURCHASE_REQUISITION_REQUEST: string = "purchase-requisition/request";
const PURCHASE_REQUISITION_REQUEST_REGEX: RegExp = new RegExp(`${PURCHASE_REQUISITION_REQUEST}*`);

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

export async function createPurchaseRequisitionRequest(purchaseRequisitionRequest: IPurchaseRequisitionRequest) {
  return await axios.post<IPurchaseRequisitionRequest>(PURCHASE_REQUISITION_REQUEST, purchaseRequisitionRequest);
}

export async function getPurchaseRequisitionRequest(startDate: Date, endDate: Date, sortBy: Sort) {
  const wrappedParams = { startDate, endDate, sortBy };
  const url: string = QueryParamsBuilder.withUrl(PURCHASE_REQUISITION_REQUEST).addParams(wrappedParams).build();
  return await axios.get<IPurchaseRequisitionRequest[]>(url);
}
