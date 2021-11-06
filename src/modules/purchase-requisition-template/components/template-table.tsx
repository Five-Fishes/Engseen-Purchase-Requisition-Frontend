import { IPurchaseRequisitionTemplateItem } from "@dto/i-purchase-requisition-template-item.dto";
import { IPurchaseRequisitionTemplate } from "@dto/i-purchase-requisition-template.dto";
import { Table, Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { DeleteOutlined } from "@ant-design/icons";

interface IPurchaseRequisitionTemplateTableProps {
  readonly currentTemplate?: IPurchaseRequisitionTemplate;
}

const PurchaseRequisitionTemplateTable: React.FC<IPurchaseRequisitionTemplateTableProps> = (props) => {
  if (props.currentTemplate && props.currentTemplate.templateName != null) {
    const templateItems = props.currentTemplate.templateItems;
    return (
      <>
        <Table
          className="my-4"
          dataSource={templateItems}
          columns={PURCHASE_REQUISITION_TEMPLATE_TABLE_COLUMN}
          rowKey="id"
          scroll={{ y: 370 }}
          pagination={{ pageSizeOptions: ["5", "10", "20", "50", "100"], hideOnSinglePage: true, defaultPageSize: 5 }}
        ></Table>
      </>
    );
  } else {
    return (
      <div className="d-flex flex-column justify-content-center my-4">
        <span className="text-center">No Template Selected</span>
      </div>
    );
  }
};

const PURCHASE_REQUISITION_TEMPLATE_TABLE_COLUMN: ColumnsType<IPurchaseRequisitionTemplateItem> = [
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
    render: (id: number) => (
      <Button type="text">
        <DeleteOutlined />
      </Button>
    ),
  },
];

export default PurchaseRequisitionTemplateTable;
