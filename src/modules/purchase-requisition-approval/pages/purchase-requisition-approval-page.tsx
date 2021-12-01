import { useState } from "react";
import Title from "antd/lib/typography/Title";
import { Button, Divider, Input } from "antd";

import { Sort } from "@constant/sort.enum";

import FilterAndSort from "../components/filter-and-sort/filter-and-sort";
import ComponentSelector from "../components/component-selector/component-selector";
import PurchaseRequisitionSelector from "../components/purchase-requisition-request-selector/purchase-requisition-request-selector";
import PurchaseRequititionApprovalTable from "../components/purchase-requisition-approval-table/purchase-requisition-approval-table";
import { CheckSquareOutlined } from "@ant-design/icons";

const PurchaseRequisitionApprovalPage: React.FC = () => {
  const [sort, setSort] = useState<Sort>();
  const [dateRange, setDateRange] = useState<[Date, Date]>();

  const handleSortChange = (value: Sort | undefined) => {
    setSort(value);
  };

  const handleDateRangeChange = (value: [Date, Date] | undefined) => {
    setDateRange(value);
  };

  return (
    <div className="container-fluid h-100">
      <div className="row">
        <Title level={4}>Purchase Approval</Title>
      </div>

      <div className="row">
        <div className="col-6">
          <div className="my-2">Advance Sorting / Filtering</div>
          <FilterAndSort sortChangedHandler={handleSortChange} dateRangeChangedHandler={handleDateRangeChange} dateRange={dateRange} sort={sort}></FilterAndSort>
        </div>
        <div className="col-6">
          <ComponentSelector></ComponentSelector>
        </div>
      </div>

      <Divider />

      <div className="row">
        <div className="col-3">
          <PurchaseRequisitionSelector></PurchaseRequisitionSelector>
        </div>
        <div className="col-9">
          <PurchaseRequititionApprovalTable></PurchaseRequititionApprovalTable>
        </div>
      </div>

      <div className="row">
        <div className="col-3 pt-3">
          <Input.TextArea placeholder="Remarks" rows={3}></Input.TextArea>
        </div>
        <div className="col-9 d-flex justify-content-end">
          <Button type="primary" size="large">
            <CheckSquareOutlined style={{ transform: "translateY(-3px)" }} /> Issue Confirmed PO
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseRequisitionApprovalPage;
