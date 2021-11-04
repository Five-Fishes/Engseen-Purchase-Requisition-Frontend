import React, { useEffect, useState } from "react";
import { Button, Col, Input, Row, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { IPurchaseRequisitionTemplateItem } from "../../../dto/i-purchase-requisition-template-item.dto";
import { ColumnsType } from "antd/lib/table";
import { IPurchaseRequisitionTemplate } from "@dto/i-purchase-requisition-template.dto";
import { getPurchaseRequisitionTemplateList } from "@api/purchase-requisition-template.api";

const PurchaseRequisitionTemplateList: React.FC = () => {
  const [purchaseRequisitionTemplateList, setPurchaseRequisitionTemplateList] = useState<IPurchaseRequisitionTemplate[]>([]);
  const [selectedPurchaseRequisitionTemplate, setSelectedPurchaseRequisitionTemplate] = useState<IPurchaseRequisitionTemplate>({} as IPurchaseRequisitionTemplate);
  const [selectedPurchaseRequisitionTemplateItems, setSelectedPurchaseRequisitionTemplateItems] = useState<IPurchaseRequisitionTemplateItem[]>([]);
  // eslint-disable-next-line
  const deleteTemplateItem = (itemIndex: number) => () => {
    selectedPurchaseRequisitionTemplateItems.splice(itemIndex, 1);
    console.log(selectedPurchaseRequisitionTemplateItems);
    setSelectedPurchaseRequisitionTemplateItems([...selectedPurchaseRequisitionTemplateItems]);
  };

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await getPurchaseRequisitionTemplateList();
        console.log(res);
        setPurchaseRequisitionTemplateList(res.data);
        if (res.data.length > 0) {
          setSelectedPurchaseRequisitionTemplate(res.data[0]);
          setSelectedPurchaseRequisitionTemplateItems(res.data[0].templateItems);
        }
      } catch (error) {
        console.error(error);
      }  
    }
    getList()
  }, []);

  const purchaseRequisitionTemplateItemsTableColumns: ColumnsType<IPurchaseRequisitionTemplateItem> = [
    {
      title: "Row",
      dataIndex: "sequence",
      key: "row",
      align: "center",
      render: (id: number, record: IPurchaseRequisitionTemplateItem, index: number) => (
        <span>{index + 1}</span>
      ),
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

  return (
    <div className="m-2">
      <h3>Purchase Requisition Template</h3>
      <div className="mx-3">
        <Row>
          <Col span={14}>
            <div className="table-responsive">
              <div className="my-3 position-relative">
                <b>{selectedPurchaseRequisitionTemplate.templateName}</b>
                <Input.Search
                  allowClear
                  bordered={false}
                  style={{ width: "40%", borderBottom: "1px solid #d9d9d9", position: "absolute", right: "5px" }}
                />
              </div>
              <Table
                columns={purchaseRequisitionTemplateItemsTableColumns}
                dataSource={selectedPurchaseRequisitionTemplateItems}
                rowKey="id"
                bordered
              />
            </div>
          </Col>
          <Col span={10}></Col>
        </Row>
      </div>
    </div>
  );
}

export default PurchaseRequisitionTemplateList;
