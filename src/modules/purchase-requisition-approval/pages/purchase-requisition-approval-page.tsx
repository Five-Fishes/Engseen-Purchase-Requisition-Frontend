import { useState } from "react";
import Title from "antd/lib/typography/Title";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Divider, Select } from "antd";
import { Sort } from "@constant/sort.enum";

const PurchaseRequisitionApprovalPage: React.FC = () => {
  const [sort, setSort] = useState<Sort>();

  const handleSortChange = (value: Sort | undefined) => {
    setSort(value);
  };

  return (
    <div className="container-fluid h-100">
      <div className="row">
        <Title level={4}>Purchase Approval</Title>
      </div>

      <div className="row">
        <div className="col-7">
          <div className="my-2">Advance Sorting / Filtering</div>
          <div className="d-flex">
            <DatePicker.RangePicker></DatePicker.RangePicker>
            <Select placeholder="Sort By" onChange={handleSortChange} style={{ width: 150 }} className="mx-1">
              <Select.Option value={Sort.ASC}>Ascending Date</Select.Option>
              <Select.Option value={Sort.DES}>Descending Date</Select.Option>
            </Select>
            <Button className="d-inline-flex align-items-center">
              <ReloadOutlined />
              Reset
            </Button>
          </div>
        </div>
        <div className="col">section 2</div>
      </div>

      <Divider />

      <div className="row">
        <div className="col">Current Sort is {sort}</div>
      </div>
    </div>
  );
};

export default PurchaseRequisitionApprovalPage;
