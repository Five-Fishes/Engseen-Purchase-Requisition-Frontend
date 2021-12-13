import { ReloadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Select } from "antd";
import moment from "moment";

import { Sort } from "@constant/sort.enum";

interface IFilterAndSortProps {
  dateRange?: [Date, Date];
  sort?: Sort;
  dateRangeChangedHandler: (dateRange: [Date, Date] | undefined) => void;
  sortChangedHandler: (sort: Sort | undefined) => void;
}

const FilterAndSort: React.FC<IFilterAndSortProps> = (props) => {
  const sortChangedHandler = props.sortChangedHandler;
  const dateRangeChangedHandler = props.dateRangeChangedHandler;
  const reset = () => {
    dateRangeChangedHandler(undefined);
    sortChangedHandler(undefined);
  };

  return (
    <>
      <DatePicker.RangePicker
        format="DD/MM/YYYY"
        value={props.dateRange && [moment(props.dateRange[0]), moment(props.dateRange[1])]}
        allowEmpty={[true, true]}
        onChange={(values) => {
          if (values && values[0] != null && values[1] != null) {
            const dateRange: [Date, Date] = [values[0].toDate(), values[1].toDate()];
            dateRangeChangedHandler(dateRange);
          }
        }}
      ></DatePicker.RangePicker>
      <Select placeholder="Sort By" value={props.sort} onChange={sortChangedHandler} style={{ width: 150 }} className="mx-1">
        <Select.Option value={Sort.ASC}>Ascending Date</Select.Option>
        <Select.Option value={Sort.DES}>Descending Date</Select.Option>
      </Select>
      <Button className="d-inline-flex align-items-center" onClick={reset}>
        <ReloadOutlined />
        Reset
      </Button>
    </>
  );
};

export default FilterAndSort;
