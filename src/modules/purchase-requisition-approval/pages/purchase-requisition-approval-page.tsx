import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Title from 'antd/lib/typography/Title';
import { Button, Divider } from 'antd';

import { Sort } from '@constant/sort.enum';
import CLONING_LIB from '@utils/cloning/cloning-lib-wrapper';
import { ApiResponseStatus } from '@constant/api-status.enum';
import { PurchaseRequisitionApprovalStatus } from '@constant/purchase-requisition-approval-status.enum';
import { getPurchaseRequisitionApproval, postPurchaseRequisitionApprovalItem, putPurchaseRequisitionApproval } from '@api/purchase-requisition-approval.api';
import { issuePO } from '@api/purchase-order.api';
import { IPurchaseRequisitionApproval } from '@dto/i-purchase-requisition-approval.dto';
import { setLoading } from '@module/shared/reducers/app-reducers';

import FilterAndSort from '../components/filter-and-sort/filter-and-sort';
import ComponentSelector from '../components/component-selector/component-selector';
import PurchaseRequisitionSelector from '../components/purchase-requisition-request-selector/purchase-requisition-request-selector';
import PurchaseRequititionApprovalTable from '../components/purchase-requisition-approval-table/purchase-requisition-approval-table';
import { PURCHASE_REQUISITION_APPROVAL_TITLE_HEIGHT, PURCHASE_REQUISITION_APPROVAL_TOP_TOOLS_HEIGHT } from '@constant/display/purchase-requisition-approval.constant';
import { IWindowSize, useWindowResized } from '@hook/window-resized.hook';
import { APP_HEADER_HEIGHT } from '@constant/display/header.constant';
import { APP_CONTENT_MARGIN } from '@constant/display/content.constant';
import { DIVIDER_HEIGHT } from '@constant/display/divider.constant';
import Paragraph from 'antd/lib/typography/Paragraph';
import { popNotification } from '@module/shared/components/notification';
import { NotificationType } from '@constant/notification.enum';
import { IPurchaseRequisitionApprovalItem } from '@dto/i-purchase-requisition-approval-item.dto';

interface IPurchaseRequisitionApprovalProps extends StateProps, DispatchProps {}

const PurchaseRequisitionApprovalPage: React.FC<IPurchaseRequisitionApprovalProps> = (props: IPurchaseRequisitionApprovalProps) => {
  const [approvalUpdated, setApprovalUpdated] = useState<boolean>(false);
  const [sort, setSort] = useState<Sort>();
  const [dateRange, setDateRange] = useState<[Date, Date]>();
  const [purchaseRequisitionApprovalList, setPurchaseRequisitionApprovalList] = useState<IPurchaseRequisitionApproval[]>();
  const [filteredPurchaseRequisitionApprovalList, setFilteredPurchaseRequisitionApprovalList] = useState<IPurchaseRequisitionApproval[]>();
  const [selectedPurchaseRequisitionApproval, setSelectedPurchaseRequisitionApproval] = useState<IPurchaseRequisitionApproval>();
  const windowSize: IWindowSize = useWindowResized();
  const PURCHASE_REQUISITION_APPROVAL_TABLE_WRAPPER_HEIGHT_CONSTRAINT: number =
    APP_HEADER_HEIGHT + APP_CONTENT_MARGIN + PURCHASE_REQUISITION_APPROVAL_TITLE_HEIGHT + PURCHASE_REQUISITION_APPROVAL_TOP_TOOLS_HEIGHT + DIVIDER_HEIGHT;

  const { setLoading } = props;

  const getApprovals = async () => {
    const approvals = await getPurchaseRequisitionApproval();
    console.log(approvals);
    if (approvals && approvals.status === ApiResponseStatus.SUCCESS) {
      console.log(approvals);
      setPurchaseRequisitionApprovalList(approvals.data);
      setFilteredPurchaseRequisitionApprovalList(approvals.data);
    }
  };

  /**
   * Initial data load
   */
  useEffect(() => {
    getApprovals();
  }, []);

  /**
   * Listen to sort and daterange changes, refilter on any changes
   */
  useEffect(() => {
    if (purchaseRequisitionApprovalList) {
      setLoading(true);
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
      setTimeout(function () {
        setLoading(false);
      }, 500);
    }
  }, [sort, dateRange, purchaseRequisitionApprovalList, setLoading]);

  /**
   * Update the selected content when purchaseRequisitionApprovalList changes
   */
  useEffect(() => {
    if (selectedPurchaseRequisitionApproval && purchaseRequisitionApprovalList) {
      const selectedId = selectedPurchaseRequisitionApproval.id;
      const selectedApproval = purchaseRequisitionApprovalList.find((approval) => approval.id === selectedId);
      setSelectedPurchaseRequisitionApproval(CLONING_LIB.deepClone(selectedApproval));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseRequisitionApprovalList]);

  const handleSortChange = (value: Sort | undefined) => {
    setSort(value);
  };

  const handleDateRangeChange = (value: [Date, Date] | undefined) => {
    setDateRange(value);
  };

  /**
   * - Pass in the currently selected purchase requisition approval with udpated data
   * - Update the approval list
   * - Updated the selected item
   * @param value The currently selected purchase requisition approval
   */
  const updatePurchaseRequisitionApproval = (value: IPurchaseRequisitionApproval) => {
    if (purchaseRequisitionApprovalList) {
      const updatedPurcahseRequisitionApprovalList = CLONING_LIB.deepClone(purchaseRequisitionApprovalList).map((approval) => {
        const updatedApproval = approval.id === value.id ? value : approval;
        updatedApproval.purchaseRequisitionApprovalItems.forEach((item) => {
          item.quantity = item.packagingSize * item.noOfPacks;
        });
        return updatedApproval;
      });
      setPurchaseRequisitionApprovalList(updatedPurcahseRequisitionApprovalList);
      setApprovalUpdated(true);
    }
  };

  const issuePurchaseOrder = () => {
    if (selectedPurchaseRequisitionApproval) {
      issuePO(selectedPurchaseRequisitionApproval.id)
        .then((res) => {
          console.log(res.status);
          if (res.status === ApiResponseStatus.SUCCESS) {
            console.log(res.data);
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
            popNotification('Successfully Issued Confirmed PO', NotificationType.success);
          }
        })
        .catch((error) => {
          console.log(error.response);
          const errResponse = error.response;
          const errorMessage = errResponse.data ? errResponse.data : 'Request Failed';
          popNotification(errorMessage, NotificationType.error);
        });
    }
  };

  const submitApprovalUpdates = () => {
    if (selectedPurchaseRequisitionApproval) {
      putPurchaseRequisitionApproval(selectedPurchaseRequisitionApproval)
        .then((res) => {
          if (res.status === ApiResponseStatus.SUCCESS) {
            setApprovalUpdated(false);
            popNotification('Successfully Updated Approval', NotificationType.success);
          }
        })
        .catch((error) => {
          console.log(error.response);
          const errResponse = error.response;
          const errorMessage = errResponse.data ? errResponse.data : 'Request Failed';
          popNotification(errorMessage, NotificationType.error);
        });
    }
  };

  const onAddComponentHandler = async (componentToAdd?: IPurchaseRequisitionApprovalItem) => {
    console.log('componentToAdd :>> ', componentToAdd);

    if (selectedPurchaseRequisitionApproval) {
      if (componentToAdd === undefined || componentToAdd === null) {
        popNotification('No component to add', NotificationType.error);
      } else {
        const res = await postPurchaseRequisitionApprovalItem(selectedPurchaseRequisitionApproval.id, componentToAdd);

        if (res && res.status === ApiResponseStatus.SUCCESS) {
          console.log('res :>> ', res);
          getApprovals();
        } else {
          console.log('res :>> ', res);
          popNotification(`Error adding component :[${res.status}] ${res.statusText}`, NotificationType.error);
        }
      }
    } else {
      popNotification('Please select an approval list before adding component', NotificationType.error);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row" style={{ height: `${PURCHASE_REQUISITION_APPROVAL_TITLE_HEIGHT}px` }}>
          <Title level={4}>Purchase Approval</Title>
        </div>

        <div className="row" style={{ height: `${PURCHASE_REQUISITION_APPROVAL_TOP_TOOLS_HEIGHT}px` }}>
          <div className="col-6">
            <div className="my-2">Advance Sorting / Filtering</div>
            <FilterAndSort sortChangedHandler={handleSortChange} dateRangeChangedHandler={handleDateRangeChange} dateRange={dateRange} sort={sort}></FilterAndSort>
          </div>
          <div className="col-6">
            <ComponentSelector onAddComponent={onAddComponentHandler}></ComponentSelector>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Divider />
          </div>
        </div>

        <div className="row" style={{ height: `${windowSize.height - PURCHASE_REQUISITION_APPROVAL_TABLE_WRAPPER_HEIGHT_CONSTRAINT}px` }}>
          <div className="col-2">
            <PurchaseRequisitionSelector
              purcahseRequisitionApprovalList={filteredPurchaseRequisitionApprovalList}
              setPurcahseRequisitionApprovalList={setFilteredPurchaseRequisitionApprovalList}
              selectedPurchaseRequisitionApproval={selectedPurchaseRequisitionApproval}
              setSelectedPurcahseRequisitionApproval={setSelectedPurchaseRequisitionApproval}
              setLoading={props.setLoading}
            />
            <Paragraph ellipsis={{ rows: 2, tooltip: true }} className="my-2" style={{ cursor: 'pointer' }}>
              Remarks: {selectedPurchaseRequisitionApproval && selectedPurchaseRequisitionApproval.remarks}
            </Paragraph>
            {approvalUpdated ? (
              <Button onClick={submitApprovalUpdates} type="primary" size="middle" className="issue-po-btn">
                Update Approval
              </Button>
            ) : (
              <Button onClick={issuePurchaseOrder} type="primary" size="middle" className="issue-po-btn">
                Issue Confirmed PO
              </Button>
            )}
          </div>
          <div className="col-10">
            <PurchaseRequititionApprovalTable
              selectedPurchaseRequisitionApproval={selectedPurchaseRequisitionApproval}
              updatePurchaseRequisitionApproval={updatePurchaseRequisitionApproval}
              setLoading={props.setLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  setLoading,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseRequisitionApprovalPage);
