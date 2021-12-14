import { IColumnFilter } from "@dto/i-column-filter";
import CLONING_LIB from "@utils/cloning/cloning-lib-wrapper";
import { Checkbox, Table, Button } from "antd";
import { useState } from "react";

interface IPurchaseRequisitionColumnFilterProps {
  setColumnFilter: (columnFilters: Map<string, boolean>) => void;
};

const PurchaseRequisitionColumnFilter: React.FC<IPurchaseRequisitionColumnFilterProps> = (props) => {
  
  const [columnFilter] = useState<Map<string, boolean>>(new Map());

  const applyColumn = () => {
    const deepCopy: Map<string, boolean> = CLONING_LIB.deepClone(columnFilter);
    props.setColumnFilter(deepCopy);
    console.log(columnFilter);
  };

  const filterColumn = (column: IFilterColumnOption, checked: boolean) => {
    columnFilter.set(column.key, !checked);
  };
  
  const COLUMN = [
    {
      title: "Filter",
      dataIndex: "filterable",
      key: "filterable",
      render: (filterable: boolean, record: IFilterColumnOption) => (
        filterable && <Checkbox onChange={e => filterColumn(record, e.target.checked)} defaultChecked={true} />
      ),
    },
    {
      title: "Column Name",
      dataIndex: "name",
      key: "name",
    },
  ];

  return (
    <>
      <Table
        style={{ width: "320px" }}
        className="mr-2"
        columns={COLUMN}
        dataSource={FILTER_COLUM_OPTION}
        showHeader={false}
        pagination={false}
      />
      <Button className="float-end mt-3" onClick={applyColumn}>Apply Column</Button>
    </>
  )
};

interface IFilterColumnOption {
  name: string;
  key: string;
  filterable: boolean;
}

const FILTER_COLUM_OPTION: IFilterColumnOption[] = [
  {
    name: "Row",
    key: "sequence",
    filterable: true,
  },
  {
    name: "Component ID",
    key: "componentCode",
    filterable: false,
  },
  {
    name: "Component Name",
    key: "componentName",
    filterable: true,
  },
  {
    name: "Vendor",
    key: "vendor",
    filterable: true,
  },
  {
    name: "Balance Qty (kgs)",
    key: "balance",
    filterable: true,
  },
  {
    name: "Packing Size (kgs per pack)",
    key: "packagingSize",
    filterable: true,
  },
]

export default PurchaseRequisitionColumnFilter;
