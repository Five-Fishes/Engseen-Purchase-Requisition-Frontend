import { PurchaseRequisitionApprovalStatus } from "@constant/purchase-requisition-aaproval-status.enum";
import { IPurchaseRequisitionApprovalItem } from "@dto/i-purchase-requisition-approval-item.dto";
import CLONING_LIB from "@utils/cloning/cloning-lib-wrapper";
import { Button, Input, Table } from "antd";
import { ChangeEvent, useState } from "react";

const PurchaseRequititionApprovalTable: React.FC = () => {
  const DUMMY_DATA: IPurchaseRequisitionApprovalItem[] = [
    {
      id:0,
      itemCost:100,
      status:PurchaseRequisitionApprovalStatus.CONFIRMED,
      componentCode: 1,
      componentName: 'ABC',
      vendorName: 'Company AAA',
      stockBalance: 99,
      packagingSize: 100,
      noOfPacks: 1000,
      quantity: 20,
      deliveryDate: new Date()
    },
    {
      id:1,
      itemCost:100,
      status:PurchaseRequisitionApprovalStatus.CONFIRMED,
      componentCode: 1,
      componentName: 'ABC',
      vendorName: 'Company AAA',
      stockBalance: 99,
      packagingSize: 100,
      noOfPacks: 1000,
      quantity: 20,
      deliveryDate: new Date()
    },
    {
      id:2,
      itemCost:100,
      status:PurchaseRequisitionApprovalStatus.CONFIRMED,
      componentCode: 1,
      componentName: 'ABC',
      vendorName: 'Company AAA',
      stockBalance: 99,
      packagingSize: 100,
      noOfPacks: 1000,
      quantity: 20,
      deliveryDate: new Date()
    },
    {
      id:3,
      itemCost:100,
      status:PurchaseRequisitionApprovalStatus.CONFIRMED,
      componentCode: 1,
      componentName: 'ABC',
      vendorName: 'Company AAA',
      stockBalance: 99,
      packagingSize: 100,
      noOfPacks: 1000,
      quantity: 20,
      deliveryDate: new Date()
    },
    {
      id:4,
      itemCost:100,
      status:PurchaseRequisitionApprovalStatus.CONFIRMED,
      componentCode: 1,
      componentName: 'ABC',
      vendorName: 'Company AAA',
      stockBalance: 99,
      packagingSize: 100,
      noOfPacks: 1000,
      quantity: 20,
      deliveryDate: new Date()
    },
  ]
  return (
    <>
      <div>
        <div className="d-flex justify-content-between">
          <div>
            <strong>Submission Date</strong>: {new Date().toLocaleDateString()}
          </div>
          <div><Input.Search placeholder="Search"></Input.Search></div>
        </div>
        <Table
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
          className="my-2"
          dataSource={DUMMY_DATA}
          columns={PURCHASE_REQUISITION_APPROVAL_TABLE_COLUMN}
          rowKey="id"
          scroll={{ x: 1200, y: 500 }}
          pagination={{ pageSizeOptions: ["5", "10", "20", "50", "100"], hideOnSinglePage: true, defaultPageSize: 5 }}
        ></Table>
      </div>
    </>
  );
};

const EditableRow: React.FC = (props) => {
  return <tr {...props} />;
};

const EditableCell: React.FC<{editable: boolean}> = (props) => {

  const [input, setInput] = useState(CLONING_LIB.deepClone((props?.children as any[])[1]));

  const handleInputChanged = (val:ChangeEvent) => {
    console.log(val)
    setInput((val.target as any).value)
  }

  return (
    <td>
      <Input value={ input || ''} onChange={handleInputChanged}></Input>
    </td>
  );
};

const PURCHASE_REQUISITION_APPROVAL_TABLE_COLUMN = [
  {
    title: "Component Name",
    dataIndex: "componentName",
    key: "componentName",
  },
  {
    title: (
      <div>
        Item Cost <br /> (RM/kg)
      </div>
    ),
    dataIndex: "itemCost",
    key: "itemCost",
  },
  {
    title: "Vendor",
    dataIndex: "vendorName",
    key: "vendorName",
  },
  {
    title: (
      <Button size="small" type="primary">
        Confirm All
      </Button>
    ),
    dataIndex: "confirmed",
    key: "confirmed",
  },
  {
    title: (
      <div>
        Packing Size <br /> (kgs per pack)
      </div>
    ),
    dataIndex: "packagingSize",
    key: "packagingSize",
  },
  {
    title: "No. of Packs to Order",
    dataIndex: "componentCode",
    key: "componentCode",
  },
  {
    title: "Total Quantity To Order (kgs)",
    dataIndex: "componentCode",
    key: "componentCode",
  },
  {
    title: "Delivery Date",
    dataIndex: "deliveryDate",
    key: "deliveryDate",
  },
  {
    title: "Balance",
    dataIndex: "balance",
    key: "balance",
  },
];

export default PurchaseRequititionApprovalTable;
