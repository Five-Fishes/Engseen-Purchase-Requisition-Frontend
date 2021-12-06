import { PurchaseRequisitionApprovalStatus, PurchaseRequisitionApprovalStatusDisplayText } from "@constant/purchase-requisition-aaproval-status.enum";
import { IPurchaseRequisitionApprovalItem } from "@dto/i-purchase-requisition-approval-item.dto";
import { Button, Input, InputNumber, Table } from "antd";
import { useState } from "react";

const PurchaseRequititionApprovalTable: React.FC = () => {
  const DUMMY_DATA: IPurchaseRequisitionApprovalItem[] = [
    {
      id: 0,
      itemCost: 100,
      status: PurchaseRequisitionApprovalStatus.TO_CONFIRM,
      componentCode: 1,
      componentName: "ABC",
      vendorName: "Company AAA",
      stockBalance: 99,
      packagingSize: 100,
      noOfPacks: 1000,
      quantity: 100000,
      deliveryDate: new Date(),
      balance: 999999,
    },
    {
      id: 1,
      itemCost: 100,
      status: PurchaseRequisitionApprovalStatus.CONFIRMED,
      componentCode: 1,
      componentName: "ABC",
      vendorName: "Company AAA",
      stockBalance: 99,
      packagingSize: 100,
      noOfPacks: 1000,
      quantity: 100000,
      deliveryDate: new Date(),
      balance: 999999,
    },
    {
      id: 2,
      itemCost: 100,
      status: PurchaseRequisitionApprovalStatus.ISSUED,
      componentCode: 1,
      componentName: "ABC",
      vendorName: "Company AAA",
      stockBalance: 99,
      packagingSize: 100,
      noOfPacks: 1000,
      quantity: 100000,
      deliveryDate: new Date(),
      balance: 999999,
    },
    {
      id: 3,
      itemCost: 100,
      status: PurchaseRequisitionApprovalStatus.CONFIRMED,
      componentCode: 1,
      componentName: "ABC",
      vendorName: "Company AAA",
      stockBalance: 99,
      packagingSize: 100,
      noOfPacks: 1000,
      quantity: 100000,
      deliveryDate: new Date(),
      balance: 999999,
    },
    {
      id: 4,
      itemCost: 100,
      status: PurchaseRequisitionApprovalStatus.CONFIRMED,
      componentCode: 1,
      componentName: "ABC",
      vendorName: "Company AAA",
      stockBalance: 99,
      packagingSize: 100,
      noOfPacks: 1000,
      quantity: 100000,
      deliveryDate: new Date(),
      balance: 999999,
    },
    {
      id: 5,
      itemCost: 100,
      status: PurchaseRequisitionApprovalStatus.CONFIRMED,
      componentCode: 1,
      componentName: "ABC",
      vendorName: "Company AAA",
      stockBalance: 99,
      packagingSize: 100,
      noOfPacks: 1000,
      quantity: 100000,
      deliveryDate: new Date(),
      balance: 999999,
    },
    {
      id: 6,
      itemCost: 100,
      status: PurchaseRequisitionApprovalStatus.CONFIRMED,
      componentCode: 1,
      componentName: "ABC",
      vendorName: "Company AAA",
      stockBalance: 99,
      packagingSize: 100,
      noOfPacks: 1000,
      quantity: 100000,
      deliveryDate: new Date(),
      balance: 999999,
    },
    {
      id: 7,
      itemCost: 100,
      status: PurchaseRequisitionApprovalStatus.CONFIRMED,
      componentCode: 1,
      componentName: "ABC",
      vendorName: "Company AAA",
      stockBalance: 99,
      packagingSize: 100,
      noOfPacks: 1000,
      quantity: 100000,
      deliveryDate: new Date(),
      balance: 999999,
    },
    {
      id: 8,
      itemCost: 100,
      status: PurchaseRequisitionApprovalStatus.CONFIRMED,
      componentCode: 1,
      componentName: "ABC",
      vendorName: "Company AAA",
      stockBalance: 99,
      packagingSize: 100,
      noOfPacks: 1000,
      quantity: 100000,
      deliveryDate: new Date(),
      balance: 999999,
    },
    {
      id: 9,
      itemCost: 100,
      status: PurchaseRequisitionApprovalStatus.CONFIRMED,
      componentCode: 1,
      componentName: "ABC",
      vendorName: "Company AAA",
      stockBalance: 99,
      packagingSize: 100,
      noOfPacks: 1000,
      quantity: 100000,
      deliveryDate: new Date(),
      balance: 999999,
    },
    {
      id: 10,
      itemCost: 100,
      status: PurchaseRequisitionApprovalStatus.CONFIRMED,
      componentCode: 1,
      componentName: "ABC",
      vendorName: "Company AAA",
      stockBalance: 99,
      packagingSize: 100,
      noOfPacks: 1000,
      quantity: 100000,
      deliveryDate: new Date(),
      balance: 999999,
    },
    {
      id: 11,
      itemCost: 100,
      status: PurchaseRequisitionApprovalStatus.CONFIRMED,
      componentCode: 1,
      componentName: "ABC",
      vendorName: "Company AAA",
      stockBalance: 99,
      packagingSize: 100,
      noOfPacks: 1000,
      quantity: 100000,
      deliveryDate: new Date(),
      balance: 999999,
    },
    {
      id: 12,
      itemCost: 100,
      status: PurchaseRequisitionApprovalStatus.CONFIRMED,
      componentCode: 1,
      componentName: "ABC",
      vendorName: "Company AAA",
      stockBalance: 99,
      packagingSize: 100,
      noOfPacks: 1000,
      quantity: 100000,
      deliveryDate: new Date(),
      balance: 999999,
    },
  ];

  const [dummyData, setDummyData] = useState(DUMMY_DATA);

  const confirmAll: () => void = () => {
    setDummyData(
      dummyData.map((data) => {
        data.status = PurchaseRequisitionApprovalStatus.CONFIRMED;
        return data;
      })
    );
  };

  const dataChanged: (changeEvent: any, key: string, index: number) => void = (changeEvent, key, index) => {
    console.log(changeEvent);
    console.log(key);
    console.log(index);
  };

  return (
    <>
      <div>
        <div className="d-flex justify-content-between">
          <div>
            <strong>Submission Date</strong>: {new Date().toLocaleDateString()}
          </div>
          <div>
            <Input.Search placeholder="Search"></Input.Search>
          </div>
        </div>

        <Table
          dataSource={dummyData}
          rowKey="id"
          className="my-2"
          scroll={{ x: 2000, y: 500 }}
          pagination={{ pageSizeOptions: ["5", "10", "20", "50", "100"], hideOnSinglePage: true, defaultPageSize: 5 }}
        >
          <Table.Column title="Component Name" dataIndex="componentName" key="componentName" />
          <Table.Column
            title={
              <div>
                Item Cost <br /> (RM/kg)
              </div>
            }
            dataIndex="itemCost"
            key="itemCost"
            render={(value, record, index: number) => {
              return <InputNumber value={value} onChange={(e) => dataChanged(e, "itemCost", index)} />;
            }}
          />
          <Table.Column
            title="Vendor"
            dataIndex="vendorName"
            key="vendorName"
            width="300px"
            render={(value, record, index) => {
              return <Input value={value} onChange={(e) => dataChanged(e, "vendorName", index)} />;
            }}
          />
          <Table.Column
            title={
              <Button onClick={confirmAll} size="small" type="primary">
                Confirm All
              </Button>
            }
            dataIndex="status"
            key="status"
            width="200px"
            render={(status: PurchaseRequisitionApprovalStatus) => {
              return <Button>{`${PurchaseRequisitionApprovalStatusDisplayText(status)}`}</Button>;
            }}
          />
          <Table.Column
            title={
              <div>
                Packing Size <br /> (kgs per pack)
              </div>
            }
            dataIndex="packagingSize"
            key="packagingSize"
            render={(value, record, index: number) => {
              return <InputNumber value={value} onChange={(e) => dataChanged(e, "packagingSize", index)} />;
            }}
          />
          <Table.Column
            title="No. of Packs to Order"
            dataIndex="noOfPacks"
            key="noOfPacks"
            render={(value, record, index: number) => {
              return <InputNumber value={value} onChange={(e) => dataChanged(e, "noOfPacks", index)} />;
            }}
          />
          <Table.Column title="Total Quantity To Order (kgs)" dataIndex="quantity" key="quantity" />
          <Table.Column title="Delivery Date" dataIndex="deliveryDate" key="deliveryDate" render={(deliveryDate) => <>{(deliveryDate as Date).toDateString()}</>} />
          <Table.Column title="Balance" dataIndex="balance" key="balance" />
        </Table>
      </div>
    </>
  );
};

export default PurchaseRequititionApprovalTable;
