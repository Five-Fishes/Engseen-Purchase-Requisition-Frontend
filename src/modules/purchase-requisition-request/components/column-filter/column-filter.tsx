import { Checkbox, Table, Button } from "antd";

interface IPurchaseRequisitionColumnFilterProps {};

const PurchaseRequisitionColumnFilter: React.FC<IPurchaseRequisitionColumnFilterProps> = (props) => {
  
  const applyColumn = () => {};

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

const filterColumn = (column: IFilterColumnOption) => {
  console.log(column);
};

const COLUMN = [
  {
    title: "Filter",
    dataIndex: "filterable",
    key: "filterable",
    render: (filterable: boolean, record: IFilterColumnOption) => (
      filterable && <Checkbox onChange={e => filterColumn(record)} defaultChecked={true} />
    ),
  },
  {
    title: "Column Name",
    dataIndex: "name",
    key: "name",
  },
];

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
