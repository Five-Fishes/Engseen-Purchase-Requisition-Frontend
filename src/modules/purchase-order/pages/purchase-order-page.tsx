import { useState } from "react";
import { Input, Button, Select, notification } from "antd";
import Title from "antd/lib/typography/Title";
import { ReloadOutlined } from "@ant-design/icons";
import { SearchEngine } from "@utils/search/native-search";
import { IPurchaseOrder } from "@dto/i-purchase-order.dto";
import { IPurchaseOrderItem } from "@dto/i-purchase-order-item.dto";
import { convertToLocalString } from "@utils/date-time/date-time-format";
import { Sort } from "@constant/sort.enum";
import { useEffect } from "react";
import { getPurchaseRequisitionRequest } from "@api/purchase-requisition-request.api";
import { ApiResponseStatus } from "@constant/api-status";
import { genereateIndex } from "../components/purchase-order-indexer";
import PurchaseOrderBrowser from "../components/purchase-order-record-browser";
import PurchaseOrderTable from "../components/purchase-order-table";
import Context from "@ant-design/icons/lib/components/Context";
import { ArgsProps } from "antd/lib/notification";

const PurchaseOrderPage: React.FC = () => {
  const [purchaseOrders, setPurchaseOrders] = useState<IPurchaseOrder[]>();
  const [filteredPurchaseOrders, setFilteredPurchaseOrders] = useState<IPurchaseOrder[]>();
  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState<IPurchaseOrder>({} as IPurchaseOrder);
  const [filteredPurchaseOrderItems, setFilteredPurchaseOrderItems] = useState<IPurchaseOrderItem[]>();
  const [searchText, setSearchText] = useState<string>("");
  const searchEngine: SearchEngine<IPurchaseOrder> = new SearchEngine([], genereateIndex);
  const [startDateFilterCriteria, setStartDateFilterCriteria] = useState<Date>();
  const [endDateFilterCriteria, setEndDateFilterCriteria] = useState<Date>();
  const [sortCriteria, setSortCriteria] = useState<Sort>(Sort.DES);

  useEffect(() => {
    const getPurchaseOrders = async () => {
      const apiResponse = await getPurchaseRequisitionRequest(new Date(), new Date(), Sort.ASC);

      // if (apiResponse && apiResponse.status === ApiResponseStatus.SUCCESS) {
      //   setPurchaseOrders(apiResponse.data);
      //   setFilteredPurchaseOrders(apiResponse.data);
      // }
    };

    getPurchaseOrders();
  }, []);

  useEffect(() => {
    filterPurchaseOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDateFilterCriteria, endDateFilterCriteria, sortCriteria])

  const search = () => {
    const filteredData = searchEngine.updateEngine(purchaseOrders ?? []).search(searchText);
    setFilteredPurchaseOrders(filteredData);
  };

  const filterStartDate = (startDate: string) => {
    setStartDateFilterCriteria(new Date(startDate));
    filterPurchaseOrders();
  };

  const filterEndDate = (endDate: string) => {
    setEndDateFilterCriteria(new Date(endDate));
    filterPurchaseOrders();
  };

  const filterPurchaseOrders = () => {
    const filteredResult: IPurchaseOrder[] = [];
    purchaseOrders?.forEach(purchaseOrder => {
      const purchaseOrderRevisionDate = new Date(purchaseOrder.revisionDate);
      if (startDateFilterCriteria !== undefined && purchaseOrderRevisionDate < startDateFilterCriteria) {
      } else if (endDateFilterCriteria !== undefined && purchaseOrderRevisionDate > endDateFilterCriteria) {
      } else {
        filteredResult.push(purchaseOrder);
      }
    });
    setFilteredPurchaseOrders(filteredResult);
  };

  const sortDate = (sort: Sort) => {
    setSortCriteria(sort);
    filteredPurchaseOrders?.sort((purchaseOrder1, purchaseOrder2) => {
      if (sort === Sort.ASC) {
        return purchaseOrder1.revisionDate < purchaseOrder2.revisionDate ? -1 : 1;
      } else if (sort === Sort.DES) {
        return purchaseOrder1.revisionDate > purchaseOrder2.revisionDate ? -1 : 1;
      }
      return 0;
    })
  };

  const resetSortingAndFilter = () => {
    setFilteredPurchaseOrders(purchaseOrders);

    setStartDateFilterCriteria(undefined);
    setEndDateFilterCriteria(undefined);
    setSortCriteria(Sort.DES);
    sortDate(Sort.DES);

    filterPurchaseOrders();
  }

  const successNotifications = () => {
    notification.success({
      message: `Success`,
      duration: 3,
      placement: "bottomRight",
    });
  };

  const errorNotifications = () => {
    notification.error({
      message: `Error`,
      duration: 3,
      placement: "bottomRight",
    });
  };

  return (
    <>
      <div className="container-fluid h-100">
        <div>
          <div className="mb-2 w-100">
            <Title className="d-inline-block" level={4}>Purchase Order Download & Email to Vendors</Title>
          </div>
          <div className="d-inline-flex flex-row align-items-center" style={{ gap: "15px", width: "max-content" }}>
            <label style={{ width: "125%" }}>Advance Sorting / Filtering</label>
            <Input key="filter-start-date-input" type="date"
              value={startDateFilterCriteria?.toISOString().substring(0, 10)}
              onChange={(e) => filterStartDate(e.target.value)} />
            <Input key="filter-end-date-input" type="date"
              value={endDateFilterCriteria?.toISOString().substring(0, 10)}
              onChange={(e) => filterEndDate(e.target.value)} />
            <Select key="sort-submission-request-select"
              value={sortCriteria}
              onChange={(value) => sortDate(value)}>
              <Select.Option value={Sort.DES}>
                Created Date Desc
              </Select.Option>
              <Select.Option value={Sort.ASC}>
                Created Date Asc
              </Select.Option>
            </Select>
            <Button className="d-inline-flex align-items-center" onClick={resetSortingAndFilter}>
              <ReloadOutlined />
              Reset
            </Button>
          </div>
          <div className="mx-2 d-inline-flex border-top mt-4">
            <div className="my-3 mb-2" style={{ alignContent: "start", maxHeight: "500px" }}>
              <PurchaseOrderBrowser
                setSelectedPurchaseOrder={setSelectedPurchaseOrder}
                purchaseOrders={purchaseOrders ?? []} />
            </div>
            <div className="my-2 mx-4 position-relative">
              <span hidden={selectedPurchaseOrder === undefined}>
                Submission Date: <b color="primary">{convertToLocalString(selectedPurchaseOrder?.revisionDate)}</b>
              </span>
              <div className="d-flex flex-column justify-content-center">
                <Input.Search
                  allowClear
                  placeholder="Search"
                  bordered={false}
                  value={searchText}
                  onChange={(e: any) => setSearchText(e.target.value)}
                  onSearch={search}
                  style={{ width: "40%", borderBottom: "1px solid #d9d9d9", position: "absolute", right: "5px" }}
                />
              </div>
              <PurchaseOrderTable
              currentPurchaseOrderRecord={selectedPurchaseOrder}
              filteredItems={filteredPurchaseOrderItems} />
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseOrderPage;
