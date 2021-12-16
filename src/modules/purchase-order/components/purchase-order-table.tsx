import React from 'react'
import { Button, Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { DownloadOutlined, MailOutlined } from '@ant-design/icons'

import { TABLE_PAGINATION_CONFIG } from '@constant/pagination-config'
import { IPurchaseOrder } from '@dto/i-purchase-order.dto'
import { IPurchaseApprovalOrder } from '@dto/i-purchase-approval-order.dto'

interface IPurchaseOrderTableProps {
  readonly currentPurchaseApprovalOrderRecord?: IPurchaseApprovalOrder
  filteredItems?: IPurchaseOrder[]
}

const PurchaseOrderTable: React.FC<IPurchaseOrderTableProps> = (props) => {
  const PURCHASE_ORDER_TABLE_COLUMN: ColumnsType<IPurchaseOrder> = [
    {
      title: 'PO Number',
      dataIndex: 'poNumber',
      key: 'poNumber',
      align: 'center',
      render: (text: string, record: IPurchaseOrder) => <span>{text}</span>,
    },
    {
      title: 'Vendor',
      dataIndex: 'vendorId',
      key: 'vendor',
      align: 'center',
      render: (text: string, record: IPurchaseOrder) => <span>{text}</span>,
    },
    {
      title: 'Generate PDF',
      dataIndex: 'id',
      key: 'generatePdf',
      align: 'center',
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
      render: (text: string, record: IPurchaseOrder) => <span>{text}</span>,
    },
    {
      title: 'Email to Vendor',
      dataIndex: 'id',
      key: 'email',
      align: 'center',
      render: (text: string, record: IPurchaseOrder) => (
        <Button disabled={record.emailed} className="d-inline-flex align-items-center po-action-button" onClick={() => emailPO(record)}>
          <MailOutlined />
          &nbsp;Email
        </Button>
      ),
    },
  ]

  const downloadPO = (purchaseOrder: IPurchaseOrder) => {
    console.group(PurchaseOrderTable.name)
    console.log('Download PO')
    console.log('Purchase Order: ', purchaseOrder)
    console.groupEnd()
  }

  const downloadAllPO = () => {
    console.group(PurchaseOrderTable.name)
    console.log('Download All PO')
    console.log('Purchase Approval Orders Id: ', currentPurchaseApprovalOrderRecord?.id)
    console.log('Purchase Orders List: ', currentPurchaseApprovalOrderRecord?.purchaseOrders)
    console.groupEnd()
  }

  const emailPO = (purchaseOrder: IPurchaseOrder) => {
    console.group(PurchaseOrderTable.name)
    console.log('Email PO')
    console.log('Purchase Order: ', purchaseOrder)
    console.groupEnd()
  }

  const emailAllPO = () => {
    console.group(PurchaseOrderTable.name)
    console.log('Email All PO')
    console.log('Purchase Approval Orders Id: ', currentPurchaseApprovalOrderRecord?.id)
    console.log('Purchase Orders List: ', currentPurchaseApprovalOrderRecord?.purchaseOrders)
    console.groupEnd()
  }

  const downloadAndEmailAll = () => {
    console.group(PurchaseOrderTable.name)
    console.log('Download & Email PO')
    console.log('Purchase Approval Orders Id: ', currentPurchaseApprovalOrderRecord?.id)
    console.log('Purchase Orders List: ', currentPurchaseApprovalOrderRecord?.purchaseOrders)
    console.groupEnd()
    downloadAllPO()
    emailAllPO()
  }

  const { currentPurchaseApprovalOrderRecord, filteredItems } = props

  if (currentPurchaseApprovalOrderRecord && currentPurchaseApprovalOrderRecord != null) {
    const submissionItems = filteredItems === undefined ? currentPurchaseApprovalOrderRecord.purchaseOrders : filteredItems
    return (
      <>
        <Table
          className="my-4"
          dataSource={submissionItems}
          columns={PURCHASE_ORDER_TABLE_COLUMN}
          rowKey="id"
          scroll={{ y: 370, x: 700 }}
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
                  <Button disabled={currentPurchaseApprovalOrderRecord.completed} className="d-inline-flex align-items-center po-action-button" onClick={() => emailAllPO()}>
                    <MailOutlined />
                    &nbsp;Email All
                  </Button>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        ></Table>
        <Space className="float-end mt-5">
          <Button type="primary" className="d-inline-flex align-items-center" onClick={() => downloadAndEmailAll()}>
            One Click to Download &#38; Email all PO
          </Button>
        </Space>
      </>
    )
  } else {
    return (
      <div className="d-flex flex-column justify-content-center my-4">
        <span className="text-center">No Purchase Order Selected</span>
      </div>
    )
  }
}

export default PurchaseOrderTable
