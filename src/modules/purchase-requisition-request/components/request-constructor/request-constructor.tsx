import { IPurchaseRequisitionTemplate } from "@dto/i-purchase-requisition-template.dto";
import Table from "antd/lib/table";

interface IPurchaseRequisitionRequestConstructorProps {
  readonly currentTemplate?: IPurchaseRequisitionTemplate;
}

const PurchaseRequisitionRequestConstructor: React.FC<IPurchaseRequisitionRequestConstructorProps> = (props) => {
  if (props.currentTemplate) {
    const templateItems = props.currentTemplate.templateItems;

    return (
      <>
        <Table
          className="my-2"
          dataSource={templateItems}
          columns={PURCHASE_REQUISITION_REQUEST_TABLE_COLUMN}
          rowKey="id"
          scroll={{ y: 370 }}
          pagination={{ pageSizeOptions: ["5", "10", "20", "50", "100"], hideOnSinglePage: true, defaultPageSize: 5 }}
        ></Table>
      </>
    );
  } else {
    return (
      <div className="d-flex flex-column justify-content-center">
        <span className="text-center">No Template Selected</span>
      </div>
    );
  }
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
