import { IColumnFilter } from "@dto/i-column-filter";
import { IPurchaseRequisitionTemplate } from "@dto/i-purchase-requisition-template.dto";
import CLONING_LIB from "@utils/cloning/cloning-lib-wrapper";
import { Input } from "antd";
import Table from "antd/lib/table";
import React, { ChangeEvent, useState } from "react";

interface IPurchaseRequisitionRequestConstructorProps {
  readonly currentTemplate?: IPurchaseRequisitionTemplate;
  tableColumn: IColumnFilter[];
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
          columns={props.tableColumn.filter(item => !item.hidden)}
          rowKey="id"
          scroll={{ y: 370, x: 1400 }}
          pagination={{ pageSizeOptions: ["5", "10", "20", "50", "100"], hideOnSinglePage: true, defaultPageSize: 5 }}
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

export default PurchaseRequisitionRequestConstructor;
