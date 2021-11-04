import React, { useState } from "react";
import { Button, Col, Input, Row, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { IPurchaseRequisitionTemplateItem } from "../../../dto/i-purchase-requisition-template-item.dto";
import { ColumnsType } from "antd/lib/table";

export function PurchaseRequisitionTemplateList() {
  // eslint-disable-next-line
  const deleteTemplateItem = (itemIndex: number) => () => {
    purchasrRequisitionTemplateItems.splice(itemIndex, 1);
    setPurchasrRequisitionTemplateItems([...purchasrRequisitionTemplateItems]);
  };

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
        <span>
          {text} - {record.componentName}
        </span>
      ),
    },
    {
      title: "Vendor",
      dataIndex: "vendorId",
      key: "vendor",
      align: "center",
      render: (text: string, record: IPurchaseRequisitionTemplateItem) => (
        <span>
          {text} - {record.vendorName}
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
      title: "Action",
      dataIndex: "id",
      key: "action",
      align: "center",
      render: (id: number, record: IPurchaseRequisitionTemplateItem, index: number) => (
        <Button type="text" onClick={deleteTemplateItem(index)}>
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  // TODO: Dummy data, should get data via API
  const [purchasrRequisitionTemplateItems, setPurchasrRequisitionTemplateItems] = useState<IPurchaseRequisitionTemplateItem[]>([
    {
      id: 1,
      componentCode: "DBECO",
      componentName: "Disperse Black ECO",
      vendorId: "BLP",
      vendorName: "BLP Sdn Bhd",
      packagingSize: 25,
      sequence: 1,
    },
    {
      id: 2,
      componentCode: "DBECO",
      componentName: "Disperse Black ECO",
      vendorId: "DyeChem",
      vendorName: "DyeChem Sdn Bhd",
      packagingSize: 30,
      sequence: 2,
    },
    {
      id: 3,
      componentCode: "ECO",
      componentName: "Black ECO",
      vendorId: "BLP",
      vendorName: "BLP Sdn Bhd",
      packagingSize: 20,
      sequence: 3,
    },
  ]);

  return (
    <div className="m-2">
      <h3>Purchase Requisition Template</h3>
      <div className="mx-3">
        <Row>
          <Col span={14}>
            <div className="table-responsive">
              <div className="my-3 position-relative">
                <b>Template Name</b>
                <Input.Search
                  allowClear
                  bordered={false}
                  style={{ width: "40%", borderBottom: "1px solid #d9d9d9", position: "absolute", right: "5px" }}
                />
              </div>
              <Table
                columns={purchaseRequisitionTemplateItemsTableColumns}
                dataSource={purchasrRequisitionTemplateItems}
                rowKey="id"
                bordered
                pagination={false}
              />
            </div>
          </Col>
          <Col span={10}></Col>
        </Row>
      </div>
    </div>
  );
}
