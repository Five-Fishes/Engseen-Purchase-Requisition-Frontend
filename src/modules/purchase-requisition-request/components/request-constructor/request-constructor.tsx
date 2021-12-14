import React from "react";
import { IColumnFilter } from "@dto/i-column-filter";
import Table from "antd/lib/table";
import { Button, DatePicker, InputNumber, Popconfirm, Popover } from "antd";

import { TABLE_PAGINATION_CONFIG } from "@constant/pagination-config";
import { IPurchaseRequisitionTemplate } from "@dto/i-purchase-requisition-template.dto";
import { IPurchaseRequisitionTemplateItem } from "@dto/i-purchase-requisition-template-item.dto";
import { ClearOutlined, EditOutlined } from "@ant-design/icons";
import PopOverDatePicker from "@module/shared/components/popover-date-picker/popover-date-picker";

interface IPurchaseRequisitionRequestConstructorProps {
  readonly currentTemplate?: IPurchaseRequisitionTemplate;
  columnFilter: Map<string, boolean>;
}

const PurchaseRequisitionRequestConstructor: React.FC<IPurchaseRequisitionRequestConstructorProps> = (props) => {
  const TEMPLATE_ITEMS: IPurchaseRequisitionTemplateItem[] = props.currentTemplate?.templateItems || [];

  return (
    <Table className="my-2" dataSource={TEMPLATE_ITEMS} rowKey="id" scroll={{ x: 2000, y: 500 }} pagination={TABLE_PAGINATION_CONFIG}>
      {console.log(props.columnFilter.get("sequence"))}
      {props.columnFilter.get("sequence") !== true && 
        <Table.Column title="Row" render={(value, record: IPurchaseRequisitionTemplateItem, index: number) => <>{index + 1}</>}  />
      }
      {props.columnFilter.get("componentCode") !== true && 
        <Table.Column title="Component ID" dataIndex="componentCode" key="componentCode" />
      }
      {props.columnFilter.get("componentName") !== true && 
        <Table.Column title="Component Name" width={300} dataIndex="componentName" key="componentName" />
      }
      {props.columnFilter.get("vendor") !== true && 
        <Table.Column title="Vendor" width={300} dataIndex="vendorName" key="vendorName" />
      }
      {props.columnFilter.get("balance") !== true && 
        <Table.Column
          title={
            <span>
              Balance Qty <br />
              (kgs)
            </span>
          }
          dataIndex="balance"
          key="balance"
        />
      }
      {props.columnFilter.get("packagingSize") !== true && 
        <Table.Column
          title={
            <span>
              Packaging Size <br />
              (kgs per pack)
            </span>
          }
          dataIndex="packagingSize"
          render={(value: number, record: IPurchaseRequisitionTemplateItem, index: number) => <InputNumber value={value} />}
          key="packagingSize"
        />
      }
      <Table.Column
        title="No. of Packs to Order"
        dataIndex="quantity"
        render={(value: number, record: IPurchaseRequisitionTemplateItem, index: number) => <InputNumber value={value} />}
        key="quantity"
      />
      <Table.Column title="Total Quantity to Order (kgs)" render={(value, record: IPurchaseRequisitionTemplateItem, index: number) => <>{record.packagingSize * 1}</>} />
      <Table.Column
        title={
          <Popover content={<DatePicker />} trigger="click">
            <div>
              <span>Delivery Date</span>
              <br />
              <span style={{ fontSize: "8px" }}>*Click to change all</span>
            </div>
          </Popover>
        }
        dataIndex="deliveryDate"
        render={(value, record: IPurchaseRequisitionTemplateItem, index: number) => (
          <>
            {new Date().toLocaleDateString()} <PopOverDatePicker icon={<EditOutlined />} />
          </>
        )}
      />
      <Table.Column
        title={
          <Popconfirm title="Are you sure you want to clear input for all rows?" okText="OK" cancelText="Cancel">
            <div>
              <span>Clear Input</span>
              <br />
              <span style={{ fontSize: "8px" }}>*Click to clear all</span>
            </div>
          </Popconfirm>
        }
        render={(value, record: IPurchaseRequisitionTemplateItem, index: number) => <Button icon={<ClearOutlined />} />}
      />
    </Table>
  );
};

export default PurchaseRequisitionRequestConstructor;
