import React, { ChangeEvent, useState } from "react";
import { Input } from "antd";
import Table from "antd/lib/table";

import CLONING_LIB from "@utils/cloning/cloning-lib-wrapper";
import { TABLE_PAGINATION_CONFIG } from "@constant/pagination-config";
import { IPurchaseRequisitionTemplate } from "@dto/i-purchase-requisition-template.dto";

interface IPurchaseRequisitionRequestConstructorProps {
  readonly currentTemplate?: IPurchaseRequisitionTemplate;
}

const PurchaseRequisitionRequestConstructor: React.FC<IPurchaseRequisitionRequestConstructorProps> = (props) => {
  if (props.currentTemplate) {
    const templateItems = props.currentTemplate.templateItems;

    return (
      <>
        <Table
          components={{
            body: {
              row: EditableRow,
              cell: EditableCell,
            },
          }}
          className="my-2"
          dataSource={templateItems}
          columns={PURCHASE_REQUISITION_REQUEST_TABLE_COLUMN}
          rowKey="id"
          scroll={{ y: 370, x: 1400 }}
          pagination={TABLE_PAGINATION_CONFIG}
        ></Table>
      </>
    );
  } else {
    return (
      <div className="d-flex flex-column justify-content-center" style={{ height: "400px" }}>
        <span className="text-center m-auto">No Template Selected</span>
      </div>
    );
  }
};

const EditableRow: React.FC = (props) => {
  return <tr {...props} />;
};

const EditableCell: React.FC<{editable: boolean}> = (props) => {

  const [input, setInput] = useState(CLONING_LIB.deepClone((props?.children as any[])[1]));

  const handleInputChanged = (val:ChangeEvent) => {
    console.log(val)
    setInput((val.target as any).value)
  }

  return (
    <td>
      <Input value={ input || ''} onChange={handleInputChanged}></Input>
    </td>
  );
};

const PURCHASE_REQUISITION_REQUEST_TABLE_COLUMN = [
  {
    title: "Row",
    dataIndex: "sequence",
    key: "sequence",
  },
  {
    title: "Component ID",
    dataIndex: "componentCode",
    key: "componentCode",
  },
  {
    title: "Component Name",
    dataIndex: "componentName",
    key: "componentName",
  },
  {
    title: "Vendor",
    dataIndex: "vendorName",
    key: "vendorName",
  },
  {
    title: "Balance Qty (kgs)",
    dataIndex: "componentCode",
    key: "componentCode",
  },
  {
    title: "Packing Size (kgs per pack)",
    dataIndex: "packagingSize",
    key: "packagingSize",
    editable: true,
  },
  {
    title: "No. of Packs to Order",
    dataIndex: "componentCode",
    key: "componentCode",
  },
  {
    title: "Total Quantity To Order (kgs)",
    dataIndex: "componentCode",
    key: "componentCode",
  },
];

export default PurchaseRequisitionRequestConstructor;
