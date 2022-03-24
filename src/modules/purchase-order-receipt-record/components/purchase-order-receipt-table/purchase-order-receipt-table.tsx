import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { TABLE_PAGINATION_CONFIG } from '@constant/pagination-config';

import { convertToLocalString } from '@utils/date-time/date-time-format';
import { APP_HEADER_HEIGHT } from '@constant/display/header.constant';
import { APP_CONTENT_MARGIN } from '@constant/display/content.constant';
import { TABLE_PAGINATION_TOOLS_HEIGHT } from '@constant/display/table.constant';
import {
  PURCHASE_ORDER_RECEIPT_TABLE_HEADER_HEIGHT,
  PURCHASE_ORDER_RECEIPT_TITLE_HEIGHT,
  PURCHASE_ORDER_RECEIPT_TOP_TOOLS_HEIGHT,
} from '@constant/display/purchase-order-receipt.constant';
import { IWindowSize, useWindowResized } from '@hook/window-resized.hook';
import { DIVIDER_HEIGHT } from '@constant/display/divider.constant';
import { IPurchaseOrderReceiptHeader } from '@dto/i-purchase-order-receipt-header.dto';

interface IPurchaseOrderReceiptTableProps {
  filteredItems?: IPurchaseOrderReceiptHeader[];
}

const PurchaseOrderReceiptTable: React.FC<IPurchaseOrderReceiptTableProps> = (props) => {
  const PURCHASE_ORDER_RECEIPT_TABLE_HEIGHT_CONSTRAINT: number =
    APP_HEADER_HEIGHT +
    APP_CONTENT_MARGIN +
    PURCHASE_ORDER_RECEIPT_TITLE_HEIGHT +
    PURCHASE_ORDER_RECEIPT_TOP_TOOLS_HEIGHT +
    DIVIDER_HEIGHT +
    PURCHASE_ORDER_RECEIPT_TABLE_HEADER_HEIGHT +
    TABLE_PAGINATION_TOOLS_HEIGHT;
  const windowSize: IWindowSize = useWindowResized();
  
  const poReceiptItems = props.filteredItems === undefined ? [] : props.filteredItems;

  const PURCHASE_ORDER_RECEIPT_TABLE_COLUMN: ColumnsType<IPurchaseOrderReceiptHeader> = [
    {
      title: 'GRN No.',
      dataIndex: 'grnNo',
      key: 'grnNo',
      align: 'center',
      width: '125px',
    },
    {
      title: 'Receipt Date',
      dataIndex: 'grnDate',
      key: 'receiptDate',
      align: 'center',
      width: '120px',
      render: (text: string, record: IPurchaseOrderReceiptHeader) => (
        <span>
          {convertToLocalString(record.grnDate, true)}
        </span>
      ),
    },
    {
      title: 'Vendor',
      dataIndex: 'vendorID',
      key: 'vendor',
      align: 'center',
      width: '156px',
      render: (text: string, record: IPurchaseOrderReceiptHeader) => (
        <span>
          {text}
          {record.vendorName ? ' - ' + record.vendorName : ''}
        </span>
      ),
    },
    {
      title: 'DO NO.',
      dataIndex: 'doNumber',
      key: 'doNumber',
      align: 'center',
      width: '115px',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'openPoReceipt',
      align: 'center',
      width: '115px',
      render: (text: string, record: IPurchaseOrderReceiptHeader) => (
        <Button className="d-inline-flex align-items-center po-action-button" onClick={() => openPOReceipt(record)}>
          &nbsp;Open
        </Button>
      ),
    },
  ];

  const openPOReceipt = async (purchaseOrderReceiptHeader: IPurchaseOrderReceiptHeader) => {
    console.group(PurchaseOrderReceiptTable.name);
    console.log('Open PO Receipt');
    console.log('Purchase Receipt Header: ', purchaseOrderReceiptHeader);
    // TODO: navigation for Open PO Receipt to Create PO Receipt with grnNo
    console.log('GRN No: ', purchaseOrderReceiptHeader.grnNo);

    console.groupEnd();
  };
  
  return (
    <>
      <Table
        className="my-1"
        dataSource={poReceiptItems}
        columns={PURCHASE_ORDER_RECEIPT_TABLE_COLUMN}
        rowKey="id"
        scroll={{ y: windowSize.height - PURCHASE_ORDER_RECEIPT_TABLE_HEIGHT_CONSTRAINT }}
        pagination={TABLE_PAGINATION_CONFIG}
      ></Table>
    </>
  );
};

export default PurchaseOrderReceiptTable;
