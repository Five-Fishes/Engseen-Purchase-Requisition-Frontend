import React from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { TABLE_PAGINATION_CONFIG } from '@constant/pagination-config';
import { convertToLocalString } from '@utils/date-time/date-time-format';
import { IPurchaseRequisitionRequest } from '@dto/i-purchase-requisition-request.dto';
import { IPurchaseRequisitionRequestItem } from '@dto/i-purchase-requisition-request-item.dto';

interface IPurchaseRequisitionSubmissionTableProps {
  readonly currentSubmissionRecord?: IPurchaseRequisitionRequest;
  filteredItems?: IPurchaseRequisitionRequestItem[];
}

const PurchaseRequisitionSubmissionTable: React.FC<IPurchaseRequisitionSubmissionTableProps> = (props) => {
  const PURCHASE_REQUISITION_SUBMISSION_TABLE_COLUMN: ColumnsType<IPurchaseRequisitionRequestItem> = [
    {
      title: 'Component',
      dataIndex: 'componentCode',
      key: 'component',
      align: 'center',
      width: "330px",
      render: (text: string, record: IPurchaseRequisitionRequestItem) => (
        <span>
          {text} - {record.componentName}
        </span>
      ),
    },
    {
      title: 'Vendor',
      dataIndex: 'vendorName',
      key: 'vendor',
      align: 'center',
      width: "310px",
      render: (text: string, record: IPurchaseRequisitionRequestItem) => <span>{record.vendorId ? record.vendorId + ' - ' : ''}{text}</span>,
    },
    {
      title: 'Packing Size (kgs per pack)',
      dataIndex: 'packagingSize',
      key: 'packingSize',
      align: 'center',
      width: "143px",
    },
    {
      title: 'No. of Packs to Order',
      dataIndex: 'noOfPacks',
      key: 'noOfPacks',
      width: "120px",
    },
    {
      title: 'Total Quantity To Order (kgs)',
      dataIndex: 'quantity',
      key: 'quantity',
      width: "136px",
    },
    {
      title: 'Delivery Date',
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
      width: "128px",
      render: (text: string, record: IPurchaseRequisitionRequestItem) => <span>{convertToLocalString(record.deliveryDate, true)}</span>,
    },
  ];

  const submissionItems = props.filteredItems === undefined ? (props.currentSubmissionRecord?.purchaseRequisitionRequestItems ?? []) : props.filteredItems;
    return (
      <>
        <Table className="my-4 mx-1" style={{ width: "1160", maxWidth: "1200px" }} dataSource={submissionItems} columns={PURCHASE_REQUISITION_SUBMISSION_TABLE_COLUMN} rowKey="id" scroll={{ y: 'calc(100vh - 250px)' }} pagination={TABLE_PAGINATION_CONFIG}></Table>
      </>
    );
};

export default PurchaseRequisitionSubmissionTable;
