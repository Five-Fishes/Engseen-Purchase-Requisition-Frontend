import { ReloadOutlined } from "@ant-design/icons";
import { Sort } from "@constant/sort.enum";
import { Button, DatePicker, Select } from "antd";

interface IFilterAndSortProps {
  dateRange?: [Date, Date];
  sort?: Sort;
  dateRangeChangedHandler: (dateRange: [Date, Date]) => void;
  sortChangedHandler: (sort: Sort) => void;
}

const FilterAndSort: React.FC<IFilterAndSortProps> = (props) => {
  const sortChangedHandler = props.sortChangedHandler;
  const dateRangeChangedHandler = props.dateRangeChangedHandler;
  return (
    <>
      <DatePicker.RangePicker
        onChange={(values, formatStrings) => {
          const dateRange: [Date, Date] = [new Date(formatStrings[0]), new Date(formatStrings[1])];
          dateRangeChangedHandler(dateRange);
        }}
      ></DatePicker.RangePicker>
      <Select placeholder="Sort By" onChange={sortChangedHandler} style={{ width: 150 }} className="mx-1">
        <Select.Option value={Sort.ASC}>Ascending Date</Select.Option>
        <Select.Option value={Sort.DES}>Descending Date</Select.Option>
      </Select>
      <Button className="d-inline-flex align-items-center">
        <ReloadOutlined />
        Reset
      </Button>
    </>
  );
};

export default FilterAndSort;
