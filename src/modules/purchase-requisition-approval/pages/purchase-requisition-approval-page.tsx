import { useEffect, useState } from 'react';
import Title from 'antd/lib/typography/Title';
import { Button, Divider, Input } from 'antd';
import { CheckSquareOutlined } from '@ant-design/icons';

import { Sort } from '@constant/sort.enum';
import CLONING_LIB from '@utils/cloning/cloning-lib-wrapper';
import { ApiResponseStatus } from '@constant/api-status.enum';
import { PurchaseRequisitionApprovalStatus } from '@constant/purchase-requisition-approval-status.enum';
import { getPurchaseRequisitionApproval } from '@api/purchase-requisition-approval.api';
import { IPurchaseRequisitionApproval } from '@dto/i-purchase-requisition-approval.dto';

import FilterAndSort from '../components/filter-and-sort/filter-and-sort';
import ComponentSelector from '../components/component-selector/component-selector';
import PurchaseRequisitionSelector from '../components/purchase-requisition-request-selector/purchase-requisition-request-selector';
import PurchaseRequititionApprovalTable from '../components/purchase-requisition-approval-table/purchase-requisition-approval-table';

const PurchaseRequisitionApprovalPage: React.FC = () => {
  const [sort, setSort] = useState<Sort>();
  const [dateRange, setDateRange] = useState<[Date, Date]>();
  const [purchaseRequisitionApprovalList, setPurchaseRequisitionApprovalList] = useState<IPurchaseRequisitionApproval[]>();
  const [filteredPurchaseRequisitionApprovalList, setFilteredPurchaseRequisitionApprovalList] = useState<IPurchaseRequisitionApproval[]>();
  const [selectedPurchaseRequisitionApproval, setSelectedPurchaseRequisitionApproval] = useState<IPurchaseRequisitionApproval>();

  /**
   * Initial data load
   */
  useEffect(() => {
    const getApprovals = async () => {
      const approvals = await getPurchaseRequisitionApproval();
      if (approvals && approvals.status === ApiResponseStatus.SUCCESS) {
        setPurchaseRequisitionApprovalList(approvals.data);
        setFilteredPurchaseRequisitionApprovalList(approvals.data);
      }
    };

    getApprovals();
  }, []);

  /**
   * Listen to sort and daterange changes, refilter on any changes
   */
  useEffect(() => {
    if (purchaseRequisitionApprovalList) {
      let filteredAndSortedList: IPurchaseRequisitionApproval[] = CLONING_LIB.deepClone(purchaseRequisitionApprovalList);

      if (dateRange) {
        filteredAndSortedList = filteredAndSortedList.filter((approval) => new Date(approval.createdDate) > dateRange[0] && new Date(approval.createdDate) < dateRange[1]);
      }

      if (sort) {
        filteredAndSortedList = filteredAndSortedList.sort((approval1, approval2) => {
          if (sort === Sort.ASC) {
            return approval1.createdDate < approval2.createdDate ? -1 : 1;
          } else if (sort === Sort.DES) {
            return approval1.createdDate > approval2.createdDate ? -1 : 1;
          }
          return 0;
        });
      }

      setFilteredPurchaseRequisitionApprovalList(filteredAndSortedList);
    }
  }, [sort, dateRange, purchaseRequisitionApprovalList]);

  /**
   * Update the selected content when purchaseRequisitionApprovalList changes
   */
  useEffect(() => {
    if (selectedPurchaseRequisitionApproval && purchaseRequisitionApprovalList) {
      const selectedId = selectedPurchaseRequisitionApproval.id;
      const selectedApproval = purchaseRequisitionApprovalList.find((approval) => approval.id === selectedId);
      setSelectedPurchaseRequisitionApproval(selectedApproval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseRequisitionApprovalList]);

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

  const updateRemarks = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedPurchaseRequisitionApproval && purchaseRequisitionApprovalList) {
      const newRemarks = e.target.value;
      const updatedPurchaseRequisitionApprovalList = CLONING_LIB.deepClone(purchaseRequisitionApprovalList).map((approval) => {
        if (approval.id === selectedPurchaseRequisitionApproval.id) {
          approval.remarks = newRemarks;
        }
        return approval;
      });
      setPurchaseRequisitionApprovalList(updatedPurchaseRequisitionApprovalList);
    }
  };

  const issuePurchaseOrder = () => {
    if (selectedPurchaseRequisitionApproval) {
      const clonedSelectedPurchaseRequisitionApproval = CLONING_LIB.deepClone(selectedPurchaseRequisitionApproval);
      const updatedApprovalItems = clonedSelectedPurchaseRequisitionApproval.purchaseRequisitionApprovalItems.map((item) => {
        if (item.status === PurchaseRequisitionApprovalStatus.CONFIRMED) {
          item.status = PurchaseRequisitionApprovalStatus.ISSUED;
        }
        return item;
      });
      clonedSelectedPurchaseRequisitionApproval.purchaseRequisitionApprovalItems = updatedApprovalItems;
      setSelectedPurchaseRequisitionApproval(clonedSelectedPurchaseRequisitionApproval);
      updatePurchaseRequisitionApproval(clonedSelectedPurchaseRequisitionApproval);
    }
  };

  return (
    <>
      <div className="container-fluid h-100 mb-remark-fixed" style={{ overflowY: 'scroll' }}>
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
              purcahseRequisitionApprovalList={filteredPurchaseRequisitionApprovalList}
              setPurcahseRequisitionApprovalList={setFilteredPurchaseRequisitionApprovalList}
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
      </div>
      <div className="row fixed-bottom mx-3 pb-1 remark-wrapper bg-white">
        <div className="col-3 pt-3 remarks-box">
          <Input.TextArea
            className="h-100"
            placeholder="Remarks"
            rows={3}
            value={selectedPurchaseRequisitionApproval && selectedPurchaseRequisitionApproval.remarks}
            onChange={(e) => updateRemarks(e)}
          ></Input.TextArea>
        </div>
        <div className="col-9 d-flex justify-content-end align-items-center">
          <Button onClick={issuePurchaseOrder} type="primary" size="large">
            <CheckSquareOutlined style={{ transform: 'translateY(-3px)' }} /> Issue Confirmed PO
          </Button>
        </div>
      </div>
    </>
  );
};

export default PurchaseRequisitionApprovalPage;
