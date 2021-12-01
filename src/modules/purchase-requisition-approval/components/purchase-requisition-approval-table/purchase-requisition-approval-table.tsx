import { Button, Input, Table } from "antd";

const PurchaseRequititionApprovalTable: React.FC = () => {
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
          className="my-2"
          dataSource={[]}
          columns={PURCHASE_REQUISITION_APPROVAL_TABLE_COLUMN}
          rowKey="id"
          scroll={{ x: 1200, y: 500 }}
          pagination={{ pageSizeOptions: ["5", "10", "20", "50", "100"], hideOnSinglePage: true, defaultPageSize: 5 }}
        ></Table>
      </div>
    </>
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
