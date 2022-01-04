import React from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { TABLE_PAGINATION_CONFIG } from '@constant/pagination-config';
import { convertToLocalString } from '@utils/date-time/date-time-format';
import { IPurchaseRequisitionRequest } from '@dto/i-purchase-requisition-request.dto';
import { IPurchaseRequisitionRequestItem } from '@dto/i-purchase-requisition-request-item.dto';
import { PURCHASE_REQUISITION_SUBMISSION_TABLE_SEARCHBAR_HEIGHT, PURCHASE_REQUISITION_SUBMISSION_TOP_TOOLS_HEIGHT } from '@constant/display/purcahse-requisition-submission.constant';
import { APP_HEADER_HEIGHT } from '@constant/display/header.constant';
import { APP_CONTENT_MARGIN } from '@constant/display/content.constant';
import { TABLE_PAGINATION_TOOLS_HEIGHT, TABLE_HEADER_HEIGHT } from '@constant/display/table.constant';
import { IWindowSize, useWindowResized } from '@hook/window-resized.hook';

interface IPurchaseRequisitionSubmissionTableProps {
  readonly currentSubmissionRecord?: IPurchaseRequisitionRequest;
  filteredItems?: IPurchaseRequisitionRequestItem[];
}

const PurchaseRequisitionSubmissionTable: React.FC<IPurchaseRequisitionSubmissionTableProps> = (props) => {
  const PURCHASE_REQUISITION_SUBMISSION_TABLE_HEIGHT_CONSTRAINT: number =
    APP_HEADER_HEIGHT +
    APP_CONTENT_MARGIN +
    PURCHASE_REQUISITION_SUBMISSION_TOP_TOOLS_HEIGHT +
    PURCHASE_REQUISITION_SUBMISSION_TABLE_SEARCHBAR_HEIGHT +
    TABLE_HEADER_HEIGHT +
    TABLE_PAGINATION_TOOLS_HEIGHT;
  const windowSize: IWindowSize = useWindowResized();
  const PURCHASE_REQUISITION_SUBMISSION_TABLE_COLUMN: ColumnsType<IPurchaseRequisitionRequestItem> = [
    {
      title: 'Component',
      dataIndex: 'componentCode',
      key: 'component',
      align: 'center',
      width: '330px',
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
      width: '310px',
      render: (text: string, record: IPurchaseRequisitionRequestItem) => (
        <span>
          {record.vendorId ? record.vendorId + ' - ' : ''}
          {text}
        </span>
      ),
    },
    {
      title: 'Packing Size (kgs per pack)',
      dataIndex: 'packagingSize',
      key: 'packingSize',
      align: 'center',
      width: '143px',
    },
    {
      title: 'No. of Packs to Order',
      dataIndex: 'noOfPacks',
      key: 'noOfPacks',
      width: '120px',
    },
    {
      title: 'Total Quantity To Order (kgs)',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '136px',
    },
    {
      title: 'Delivery Date',
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
      width: '128px',
      render: (text: string, record: IPurchaseRequisitionRequestItem) => <span>{convertToLocalString(record.deliveryDate, true)}</span>,
    },
  ];

  const submissionItems = props.filteredItems === undefined ? props.currentSubmissionRecord?.purchaseRequisitionRequestItems ?? [] : props.filteredItems;
  return (
    <>
      <Table
        className="my-1"
        dataSource={submissionItems}
        columns={PURCHASE_REQUISITION_SUBMISSION_TABLE_COLUMN}
        rowKey="id"
        scroll={{ y: windowSize.height - PURCHASE_REQUISITION_SUBMISSION_TABLE_HEIGHT_CONSTRAINT }}
        pagination={TABLE_PAGINATION_CONFIG}
      ></Table>
    </>
  );
};

export default PurchaseRequisitionSubmissionTable;
