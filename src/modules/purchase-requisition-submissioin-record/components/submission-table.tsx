import React from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";

import { TABLE_PAGINATION_CONFIG } from "@constant/pagination-config";
import { convertToLocalString } from "@utils/date-time/date-time-format";
import { IPurchaseRequisitionRequest } from "@dto/i-purchase-requisition-request.dto";
import { IPurchaseRequisitionRequestItem } from "@dto/i-purchase-requisition-request-item.dto";

interface IPurchaseRequisitionSubmissionTableProps {
  readonly currentSubmissionRecord?: IPurchaseRequisitionRequest;
  filteredItems?: IPurchaseRequisitionRequestItem[];
}

const PurchaseRequisitionSubmissionTable: React.FC<IPurchaseRequisitionSubmissionTableProps> = (props) => {
  const PURCHASE_REQUISITION_SUBMISSION_TABLE_COLUMN: ColumnsType<IPurchaseRequisitionRequestItem> = [
    {
      title: "Component",
      dataIndex: "componentCode",
      key: "component",
      align: "center",
      render: (text: string, record: IPurchaseRequisitionRequestItem) => (
        <span>
          {text} - {record.componentName}
        </span>
      ),
    },
    {
      title: "Vendor",
      dataIndex: "vendorName",
      key: "vendor",
      align: "center",
      render: (text: string, record: IPurchaseRequisitionRequestItem) => (
        <span>
          {text}
        </span>
      ),
    },
    {
      title: "Packing Size (kgs per pack)",
      dataIndex: "packagingSize",
      key: "packingSize",
      align: "center",
    },
    {
      title: "No. of Packs to Order",
      dataIndex: "noOfPacks",
      key: "noOfPacks",
    },
    {
      title: "Total Quantity To Order (kgs)",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Delivery Date",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
      render: (text: string, record: IPurchaseRequisitionRequestItem) => (
        <span>
          {convertToLocalString(record.deliveryDate, true)}
        </span>
      ),
    },
  ];

  if (props.currentSubmissionRecord && props.currentSubmissionRecord != null) {
    const submissionItems = props.filteredItems === undefined ? props.currentSubmissionRecord.purchaseRequisitionRequestItems : props.filteredItems;
    return (
      <>
        <Table
          className="my-4"
          dataSource={submissionItems}
          columns={PURCHASE_REQUISITION_SUBMISSION_TABLE_COLUMN}
          rowKey="id"
          scroll={{ y: 370 }}
          pagination={TABLE_PAGINATION_CONFIG}
        ></Table>
      </>
    );
  } else {
    return (
      <div className="d-flex flex-column justify-content-center my-4 w-100">
        <span className="text-center">No Submission Selected</span>
      </div>
    );
  }
};

export default PurchaseRequisitionSubmissionTable;
