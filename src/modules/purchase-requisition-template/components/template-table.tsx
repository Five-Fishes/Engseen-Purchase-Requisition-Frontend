import React from 'react'
import { Table, Button, Modal } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

import { TABLE_PAGINATION_CONFIG } from '@constant/pagination-config'
import { IPurchaseRequisitionTemplateItem } from '@dto/i-purchase-requisition-template-item.dto'
import { IPurchaseRequisitionTemplate } from '@dto/i-purchase-requisition-template.dto'

interface IPurchaseRequisitionTemplateTableProps {
  readonly currentTemplate?: IPurchaseRequisitionTemplate
  deleteTemplateComponent: (itemIndex: number) => void
  filteredItems?: IPurchaseRequisitionTemplateItem[]
}

const PurchaseRequisitionTemplateTable: React.FC<IPurchaseRequisitionTemplateTableProps> = (props) => {
  const { confirm } = Modal

  const PURCHASE_REQUISITION_TEMPLATE_TABLE_COLUMN: ColumnsType<IPurchaseRequisitionTemplateItem> = [
    {
      title: 'Row',
      dataIndex: 'sequence',
      key: 'row',
      align: 'center',
    },
    {
      title: 'Component',
      dataIndex: 'componentCode',
      key: 'component',
      align: 'center',
      render: (text: string, record: IPurchaseRequisitionTemplateItem) => (
        <span>
          {text} - {record.componentName}
        </span>
      ),
    },
    {
      title: 'Vendor',
      dataIndex: 'vendorId',
      key: 'vendor',
      align: 'center',
      render: (text: string, record: IPurchaseRequisitionTemplateItem) => (
        <span>
          {text} - {record.vendorName}
        </span>
      ),
    },
    {
      title: 'Packing Size (kgs per pack)',
      dataIndex: 'packagingSize',
      key: 'packingSize',
      align: 'center',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'action',
      align: 'center',
      render: (id: number, record: IPurchaseRequisitionTemplateItem, index: number) => (
        <Button type="text">
          <DeleteOutlined
            onClick={() => {
              confirm({
                title: 'Are you sure?',
                icon: <ExclamationCircleOutlined />,
                content: "You won't be able to revert it",
                okText: 'Delete',
                okType: 'primary',
                cancelText: 'Cancel',
                onOk() {
                  props.deleteTemplateComponent(index)
                },
              })
            }}
          />
        </Button>
      ),
    },
  ]

  if (props.currentTemplate && props.currentTemplate.templateName != null) {
    const templateItems = props.filteredItems === undefined ? props.currentTemplate.templateItems : props.filteredItems
    return (
      <>
        <Table className="my-4" dataSource={templateItems} columns={PURCHASE_REQUISITION_TEMPLATE_TABLE_COLUMN} rowKey="sequence" scroll={{ y: 370 }} pagination={TABLE_PAGINATION_CONFIG}></Table>
      </>
    )
  } else {
    return (
      <div className="d-flex flex-column justify-content-center my-4">
        <span className="text-center">No Template Selected</span>
      </div>
    )
  }
}

export default PurchaseRequisitionTemplateTable
