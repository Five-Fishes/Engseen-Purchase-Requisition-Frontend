import React from "react";
import { Button, Col, Input, Row, Table } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import { IPurchaseRequisitionTemplateItem } from "../../dto/i-purchase-requisition-template-item.dto";
import { IPurchaseRequisitionTemplate } from "../../dto/i-purchase-requisition-template.dto";
import { ColumnsType } from "antd/lib/table";

export function PurchaseRequisitionTemplateList () {

  const deleteTemplateItem = function(templateItemId: number) {
    // TODO: API to delete template item
  }

  const purchaseRequisitionTemplateItemsTableColumns: ColumnsType<IPurchaseRequisitionTemplateItem> = [
    {
      title: "Row",
      dataIndex: "sequence",
      key: "row",
      align: "center",
    },
    {
      title: "Component",
      dataIndex: "componentCode",
      key: "component",
      align: "center",
      render: (text: string, record: IPurchaseRequisitionTemplateItem) => (
        <span>{text} - {record.componentName}</span>
      ),
    },
    {
      title: "Vendor",
      dataIndex: "vendorId",
      key: "vendor",
      align: "center",
      render: (text: string, record: IPurchaseRequisitionTemplateItem) => (
        <span>{text} - {record.vendorName}</span>
      ),
    },
    {
      title: "Packing Size (kgs per pack)",
      dataIndex: "packagingSize",
      key: "packingSize",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      align: "center",
      render: (id: number) => (
        <Button type="text">
          <DeleteOutlined />
        </Button>
      ),
    }
  ];

  // TODO: Dummy data, should get data via API
  const purchasrRequisitionTemplateItems: IPurchaseRequisitionTemplateItem[] = [
    {
      id: 1,
      componentCode: 'DBECO',
      componentName: 'Disperse Black ECO',
      vendorId: 'BLP',
      vendorName: 'BLP Sdn Bhd',
      packagingSize: 25,
      sequence: 1
    },
    {
      id: 2,
      componentCode: 'DBECO',
      componentName: 'Disperse Black ECO',
      vendorId: 'DyeChem',
      vendorName: 'DyeChem Sdn Bhd',
      packagingSize: 30,
      sequence: 2
    }
  ];

  return (
    <div>
      <h2>Purchase Template</h2>
      <Row>
        <Col span={14}>
          <div className="table-responsive">
            <div className="my-2 d-flex justify-content-end">
              <Input.Search allowClear bordered={false} style={{ width: '40%', borderBottom: '1px solid #d9d9d9' }}  />
            </div>
            <Table columns={purchaseRequisitionTemplateItemsTableColumns} 
              dataSource={purchasrRequisitionTemplateItems} 
              rowKey="id" bordered />
          </div>
        </Col>
        <Col span={10}>
        </Col>
      </Row>
      
    </div>
  )
}