import { useEffect, useState } from "react";
import Title from "antd/lib/typography/Title";
import { Button, Divider, Input } from "antd";
import { CheckSquareOutlined } from "@ant-design/icons";

import { Sort } from "@constant/sort.enum";
import { ApiResponseStatus } from "@constant/api-status.enum";
import CLONING_LIB from "@utils/cloning/cloning-lib-wrapper";
import { getPurchaseRequisitionApproval } from "@api/purchase-requisition-approval.api";
import { IPurchaseRequisitionApproval } from "@dto/i-purchase-requisition-approval.dto";

import FilterAndSort from "../components/filter-and-sort/filter-and-sort";
import ComponentSelector from "../components/component-selector/component-selector";
import PurchaseRequisitionSelector from "../components/purchase-requisition-request-selector/purchase-requisition-request-selector";
import PurchaseRequititionApprovalTable from "../components/purchase-requisition-approval-table/purchase-requisition-approval-table";
import { PurchaseRequisitionApprovalStatus } from "@constant/purchase-requisition-approval-status.enum";

const PurchaseRequisitionApprovalPage: React.FC = () => {
  const [sort, setSort] = useState<Sort>();
  const [dateRange, setDateRange] = useState<[Date, Date]>();
  const [purchaseRequisitionApprovalList, setPurchaseRequisitionApprovalList] = useState<IPurchaseRequisitionApproval[]>();
  const [selectedPurchaseRequisitionApproval, setSelectedPurchaseRequisitionApproval] = useState<IPurchaseRequisitionApproval>();

  useEffect(() => {
    const getApprovals = async () => {
      const approvals = await getPurchaseRequisitionApproval();
      if (approvals && approvals.status === ApiResponseStatus.SUCCESS) {
        setPurchaseRequisitionApprovalList(approvals.data);
      }
    };

    getApprovals();
  }, []);

  const handleSortChange = (value: Sort | undefined) => {
    setSort(value);
  };

  const handleDateRangeChange = (value: [Date, Date] | undefined) => {
    setDateRange(value);
  };

  const updatePurchaseRequisitionApproval = (value: IPurchaseRequisitionApproval) => {
    if (purchaseRequisitionApprovalList) {
      const updatedPurcahseRequisitionApprovalList = CLONING_LIB.deepClone(purchaseRequisitionApprovalList).map((approval) => {
        const updatedApproval = approval.id === value.id ? value : approval;
        return updatedApproval;
      });
      setPurchaseRequisitionApprovalList(updatedPurcahseRequisitionApprovalList);
    }
  };

  const issuePurchaseOrder = () => {
    console.log("issue PO")
    if (selectedPurchaseRequisitionApproval) {
      const clonedSelectedPurchaseRequisitionApproval = CLONING_LIB.deepClone(selectedPurchaseRequisitionApproval);
      const updatedApprovalItems = clonedSelectedPurchaseRequisitionApproval.purchaseRequisitionApprovalItems.map(item => {
        if (item.status === PurchaseRequisitionApprovalStatus.CONFIRMED) {
          item.status = PurchaseRequisitionApprovalStatus.ISSUED;
        }
        return item;
      });
      clonedSelectedPurchaseRequisitionApproval.purchaseRequisitionApprovalItems = updatedApprovalItems;
      setSelectedPurchaseRequisitionApproval(clonedSelectedPurchaseRequisitionApproval);
      updatePurchaseRequisitionApproval(clonedSelectedPurchaseRequisitionApproval);
    }
  }

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
          <PurchaseRequisitionSelector
            purcahseRequisitionApprovalList={purchaseRequisitionApprovalList}
            setPurcahseRequisitionApprovalList={setPurchaseRequisitionApprovalList}
            selectedPurcahseRequisitionApproval={selectedPurchaseRequisitionApproval}
            setSelectedPurcahseRequisitionApproval={setSelectedPurchaseRequisitionApproval}
          ></PurchaseRequisitionSelector>
        </div>
        <div className="col-9">
          <PurchaseRequititionApprovalTable
            selectedPurchaseRequisitionApproval={selectedPurchaseRequisitionApproval}
            updatePurchaseRequisitionApproval={updatePurchaseRequisitionApproval}
          ></PurchaseRequititionApprovalTable>
        </div>
      </div>

      <div className="row">
        <div className="col-3 pt-3">
          <Input.TextArea placeholder="Remarks" rows={3}></Input.TextArea>
        </div>
        <div className="col-9 d-flex justify-content-end">
          <Button onClick={issuePurchaseOrder} type="primary" size="large">
            <CheckSquareOutlined style={{ transform: "translateY(-3px)" }}/> Issue Confirmed PO
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseRequisitionApprovalPage;
