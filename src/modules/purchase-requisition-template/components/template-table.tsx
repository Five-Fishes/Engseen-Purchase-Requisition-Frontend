import React from 'react';
import { Table, Button, Modal } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import { TABLE_PAGINATION_CONFIG } from '@constant/pagination-config';
import { IPurchaseRequisitionTemplateItem } from '@dto/i-purchase-requisition-template-item.dto';
import { IPurchaseRequisitionTemplate } from '@dto/i-purchase-requisition-template.dto';

interface IPurchaseRequisitionTemplateTableProps {
  readonly currentTemplate?: IPurchaseRequisitionTemplate;
  deleteTemplateComponent: (itemIndex: number) => void;
  filteredItems?: IPurchaseRequisitionTemplateItem[];
}

const PurchaseRequisitionTemplateTable: React.FC<IPurchaseRequisitionTemplateTableProps> = (props) => {
  const { confirm } = Modal;

  const PURCHASE_REQUISITION_TEMPLATE_TABLE_COLUMN: ColumnsType<IPurchaseRequisitionTemplateItem> = [
    {
      title: 'Row',
      dataIndex: 'sequence',
      key: 'row',
      align: 'center',
      width: "65px",
    },
    {
      title: 'Component',
      dataIndex: 'componentCode',
      key: 'component',
      align: 'center',
      width: "322px",
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
      width: "309px",
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
      width: "136px",
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'action',
      align: 'center',
      width: "88px",
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
                  props.deleteTemplateComponent(index);
                },
              });
            }}
          />
        </Button>
      ),
    },
  ];

  const templateItems = props.filteredItems === undefined ? (props.currentTemplate?.templateItems ?? []) : props.filteredItems;
  return (
    <>
      <Table className="my-4" style={{ width: "940px", maxWidth: "1000px" }} dataSource={templateItems} columns={PURCHASE_REQUISITION_TEMPLATE_TABLE_COLUMN} rowKey="sequence" scroll={{ y: 'calc(100vh - 250px)' }} pagination={TABLE_PAGINATION_CONFIG}></Table>
    </>
  );
};

export default PurchaseRequisitionTemplateTable;
