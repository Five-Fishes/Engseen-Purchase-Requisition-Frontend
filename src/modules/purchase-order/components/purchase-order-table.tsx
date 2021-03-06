import React from 'react';
import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { DownloadOutlined, MailOutlined } from '@ant-design/icons';

import { TABLE_PAGINATION_CONFIG } from '@constant/pagination-config';
import { IPurchaseOrder } from '@dto/i-purchase-order.dto';
import { IPurchaseApprovalOrder } from '@dto/i-purchase-approval-order.dto';
import { downloadPOFromAPI, emailPurchaseOrder } from '@api/purchase-order.api';
import { NotificationType } from '@constant/notification.enum';
import { popNotification } from '@module/shared/components/notification';
import { downloadBlobAsFileWithNameAndExtension } from '@utils/file-download/file-download';
import { ApiResponseStatus } from '@constant/api-status.enum';

interface IPurchaseOrderTableProps {
  readonly currentPurchaseApprovalOrderRecord?: IPurchaseApprovalOrder;
  filteredItems?: IPurchaseOrder[];
}

const PurchaseOrderTable: React.FC<IPurchaseOrderTableProps> = (props) => {
  const PURCHASE_ORDER_TABLE_COLUMN: ColumnsType<IPurchaseOrder> = [
    {
      title: 'PO Number',
      dataIndex: 'poNumber',
      key: 'poNumber',
      align: 'center',
      width: '136px',
      render: (text: string, record: IPurchaseOrder) => <span>{text}</span>,
    },
    {
      title: 'Vendor',
      dataIndex: 'vendorId',
      key: 'vendor',
      align: 'center',
      width: '276px',
      render: (text: string, record: IPurchaseOrder) => (
        <span>
          {text} {record.vendorName ? '- ' + record.vendorName : ''}
        </span>
      ),
    },
    {
      title: 'Generate PDF',
      dataIndex: 'id',
      key: 'generatePdf',
      align: 'center',
      width: '181px',
      render: (text: string, record: IPurchaseOrder) => (
        <Button className="d-inline-flex align-items-center po-action-button" onClick={() => downloadPO(record)}>
          <DownloadOutlined />
          &nbsp;Download
        </Button>
      ),
    },
    {
      title: 'File Name',
      dataIndex: 'id',
      key: 'filename',
      align: 'center',
      width: '150px',
      render: (text: string, record: IPurchaseOrder) => (
        <span>
          {record.poNumber} {record.vendorId}.pdf
        </span>
      ),
    },
    {
      title: 'Email to Vendor',
      dataIndex: 'id',
      key: 'email',
      align: 'center',
      width: '166px',
      render: (text: string, record: IPurchaseOrder) => (
        <Button disabled={record.emailed} className="d-inline-flex align-items-center po-action-button" onClick={() => emailPO(record)}>
          <MailOutlined />
          &nbsp;Email
        </Button>
      ),
    },
  ];

  const downloadPO = async (purchaseOrder: IPurchaseOrder) => {
    console.group(PurchaseOrderTable.name);
    console.log('Download PO');
    console.log('Purchase Order: ', purchaseOrder);
    console.groupEnd();

    /** Load from API */
    const res = await downloadPOFromAPI(purchaseOrder.id);

    if (res) {
      if (res.status === ApiResponseStatus.SUCCESS) {
        /**
         * 1. Load data as blob
         * 2. Name the file
         * 3. provide file extension
         * */
        const blob: Blob = new Blob([res.data]);
        const fileName: string = `${purchaseOrder.poNumber} ${purchaseOrder.vendorId}`;
        const fileExtension: string = 'pdf';

        downloadBlobAsFileWithNameAndExtension(blob, fileName, fileExtension);
      } else {
        popNotification(res.statusText, NotificationType.error);
      }
    } else {
      popNotification('Server Download PO PDF API error', NotificationType.error);
    }
  };

  const downloadAllPO = async () => {
    console.group(PurchaseOrderTable.name);
    console.log('Download All PO');
    console.log('Purchase Approval Orders Id: ', currentPurchaseApprovalOrderRecord?.id);
    console.log('Purchase Orders List: ', currentPurchaseApprovalOrderRecord?.purchaseOrders);
    if (currentPurchaseApprovalOrderRecord && currentPurchaseApprovalOrderRecord.purchaseOrders) {
      const downloadRequests: Promise<void>[] = currentPurchaseApprovalOrderRecord.purchaseOrders.map((purchaseOrder) => downloadPO(purchaseOrder));
      try {
        await Promise.all(downloadRequests);
      } catch (e: any) {
        popNotification(e, NotificationType.error);
      }
    }
    console.groupEnd();
  };

  const emailPO = (purchaseOrder: IPurchaseOrder) => {
    console.group(PurchaseOrderTable.name);
    console.log('Email PO');
    console.log('Purchase Order: ', purchaseOrder);
    console.groupEnd();
    emailPurchaseOrder(purchaseOrder.id)
      .then((res) => {
        if (res.status === 200) {
          popNotification('Success Email PO to vendor', NotificationType.success);
        }
      })
      .catch((error) => {
        const errResponse = error.response;
        const errorMessage = errResponse.data ? errResponse.data : 'Request Failed';
        popNotification(errorMessage, NotificationType.error);
      });
  };

  const emailAllPO = () => {
    console.group(PurchaseOrderTable.name);
    console.log('Email All PO');
    console.log('Purchase Approval Orders Id: ', currentPurchaseApprovalOrderRecord?.id);
    console.log('Purchase Orders List: ', currentPurchaseApprovalOrderRecord?.purchaseOrders);
    if (currentPurchaseApprovalOrderRecord && currentPurchaseApprovalOrderRecord.purchaseOrders) {
      currentPurchaseApprovalOrderRecord.purchaseOrders.forEach((purchaseOrder) => {
        emailPO(purchaseOrder);
      });
    }
    console.groupEnd();
  };

  const downloadAndEmailAll = () => {
    console.group(PurchaseOrderTable.name);
    console.log('Download & Email PO');
    console.log('Purchase Approval Orders Id: ', currentPurchaseApprovalOrderRecord?.id);
    console.log('Purchase Orders List: ', currentPurchaseApprovalOrderRecord?.purchaseOrders);
    console.groupEnd();
    downloadAllPO();
    emailAllPO();
  };

  const { currentPurchaseApprovalOrderRecord, filteredItems } = props;

  const submissionItems = filteredItems === undefined ? currentPurchaseApprovalOrderRecord?.purchaseOrders ?? [] : filteredItems;
  return (
    <>
      <Table
        className="my-4"
        dataSource={submissionItems}
        columns={PURCHASE_ORDER_TABLE_COLUMN}
        rowKey="id"
        scroll={{ y: 'calc(100vh - 400px)' }}
        pagination={TABLE_PAGINATION_CONFIG}
        summary={() => (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}></Table.Summary.Cell>
              <Table.Summary.Cell index={1}></Table.Summary.Cell>
              <Table.Summary.Cell index={2} align="center">
                <Button className="d-inline-flex align-items-center po-action-button" onClick={() => downloadAllPO()}>
                  <DownloadOutlined />
                  &nbsp;Download All
                </Button>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3}></Table.Summary.Cell>
              <Table.Summary.Cell index={4} align="center">
                <Button disabled={currentPurchaseApprovalOrderRecord?.completed} className="d-inline-flex align-items-center po-action-button" onClick={() => emailAllPO()}>
                  <MailOutlined />
                  &nbsp;Email All
                </Button>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
      ></Table>
      <Space className="float-end">
        <Button type="primary" className="d-inline-flex align-items-center" onClick={() => downloadAndEmailAll()}>
          One Click to Download &#38; Email all PO
        </Button>
      </Space>
    </>
  );
};

export default PurchaseOrderTable;
