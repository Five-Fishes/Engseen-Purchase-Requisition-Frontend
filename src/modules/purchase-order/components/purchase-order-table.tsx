import { Button, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React from "react";
import { IPurchaseOrder } from "@dto/i-purchase-order.dto";
import { IPurchaseOrderItem } from "@dto/i-purchase-order-item.dto";
import { DownloadOutlined, MailOutlined } from "@ant-design/icons";

interface IPurchaseOrderTableProps {
  readonly currentPurchaseOrderRecord?: IPurchaseOrder;
  filteredItems?: IPurchaseOrderItem[];
}

const PurchaseOrderTable: React.FC<IPurchaseOrderTableProps> = (props) => {
  const PURCHASE_ORDER_TABLE_COLUMN: ColumnsType<IPurchaseOrderItem> = [
    {
      title: "PO Number",
      dataIndex: "id",
      key: "poNumber",
      align: "center",
      render: (text: string, record: IPurchaseOrderItem) => (
        <span>
          {text}
        </span>
      ),
    },
    {
      title: "Vendor",
      dataIndex: "vendorId",
      key: "vendor",
      align: "center",
      render: (text: string, record: IPurchaseOrderItem) => (
        <span>
          {text}
        </span>
      ),
    },
    {
      title: "Generate PDF",
      dataIndex: "id",
      key: "generatePdf",
      align: "center",
      render: (text: string, record: IPurchaseOrderItem) => (
        <Button className="d-inline-flex align-items-center po-action-button">
          <DownloadOutlined onClick={() => {
            console.log("DOWNLOAD PDF")
          }} />&nbsp;Download
        </Button>
      ),
    },
    {
      title: "File Name",
      dataIndex: "id",
      key: "filename",
      align: "center",
      render: (text: string, record: IPurchaseOrderItem) => (
        <span>
          {text}
        </span>
      ),
    },
    {
      title: "Email to Vendor",
      dataIndex: "id",
      key: "email",
      align: "center",
      render: (text: string, record: IPurchaseOrderItem) => (
        <Button className="d-inline-flex align-items-center po-action-button">
          <MailOutlined onClick={() => {
            console.log("EMAIL VENDOR")
          }} />&nbsp;Email
        </Button>
      ),
    },
  ];

  const downloadPO = (purchaseOrder: IPurchaseOrder) => {
    console.group(PurchaseOrderTable.name);
    console.log("Download PO");
    console.log("Purchase Order: ", purchaseOrder);
    console.groupEnd();
  };

  const emailPO = (purchaseOrder: IPurchaseOrder) => {
    console.group(PurchaseOrderTable.name);
    console.log("Email PO");
    console.log("Purchase Order: ", purchaseOrder);
    console.groupEnd();
  };

  const { currentPurchaseOrderRecord, filteredItems } = props;

  if (currentPurchaseOrderRecord && currentPurchaseOrderRecord != null) {
    const submissionItems = filteredItems === undefined ? currentPurchaseOrderRecord.purchaseOrderItems : filteredItems;
    return (
      <>
        <Table
          className="my-4"
          dataSource={submissionItems}
          columns={PURCHASE_ORDER_TABLE_COLUMN}
          rowKey="id"
          scroll={{ y: 370 }}
          pagination={{ pageSizeOptions: ["5", "10", "20", "50", "100"], hideOnSinglePage: true, defaultPageSize: 5 }}
        ></Table>
      </>
    );
  } else {
    return (
      <div className="d-flex flex-column justify-content-center my-4">
        <span className="text-center">No Purchase Order Selected</span>
      </div>
    );
  }
};

export default PurchaseOrderTable;
