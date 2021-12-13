import { useState, useEffect } from "react";
import { Input, Button, Select, DatePicker } from "antd";
import Title from "antd/lib/typography/Title";
import { ReloadOutlined } from "@ant-design/icons";
import moment from "moment";
import { SearchEngine } from "@utils/search/native-search";
import { IPurchaseApprovalOrder } from "@dto/i-purchase-approval-order.dto";
import { IPurchaseOrder } from "@dto/i-purchase-order.dto";
import { convertToLocalString } from "@utils/date-time/date-time-format";
import { Sort } from "@constant/sort.enum";
import { getPurchaseOrders }  from "@api/purchase-order.api";
import { ApiResponseStatus } from "@constant/api-status.enum";
import { genereateIndex } from "../components/purchase-order-indexer";
import PurchaseOrderBrowser from "../components/purchase-order-record-browser";
import PurchaseOrderTable from "../components/purchase-order-table";
import { popNotification } from "@module/shared/components/notification";
import { NotificationType } from "@constant/notification.enum";
import CLONING_LIB from "@utils/cloning/cloning-lib-wrapper";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import PurchaseOrderTemplate from "@module/shared/components/PurchaseOrderTemplate/PurchaseOrderTemplate";

const PurchaseOrderPage: React.FC = () => {
  const [purchaseApprovalOrders, setPurchaseApprovalOrders] = useState<IPurchaseApprovalOrder[]>();
  const [filteredPurchaseApprovalOrders, setFilteredPurchaseApprovalOrders] = useState<IPurchaseApprovalOrder[]>();
  const [selectedPurchaseApprovalOrder, setSelectedPurchaseApprovalOrder] = useState<IPurchaseApprovalOrder>();

  const [filteredPurchaseOrders, setFilteredPurchaseOrders] = useState<IPurchaseOrder[]>();
  
  const [searchText, setSearchText] = useState<string>("");
  const searchEngine: SearchEngine<IPurchaseOrder> = new SearchEngine([], genereateIndex);
  
  const [startDateFilterCriteria, setStartDateFilterCriteria] = useState<Date>();
  const [endDateFilterCriteria, setEndDateFilterCriteria] = useState<Date>();
  const [sortCriteria, setSortCriteria] = useState<Sort>(Sort.DES);

  useEffect(() => {
    const getPurchaseApprovalOrderList = async () => {
      const apiResponse = await getPurchaseOrders(new Date(), new Date(), Sort.ASC);

      if (apiResponse && apiResponse.status === ApiResponseStatus.SUCCESS) {
        const deepCopy: IPurchaseApprovalOrder[] = CLONING_LIB.deepClone(getPurchaseApprovalOrdersProgress(apiResponse.data));
        setPurchaseApprovalOrders(deepCopy);
        setFilteredPurchaseApprovalOrders(deepCopy);
      }
    };

    getPurchaseApprovalOrderList();
  }, []);

  useEffect(() => {
    console.group(PurchaseOrderPage.name);
    console.log("Filtering list after filters are set >>: ", {
      startDateFilterCriteria,
      endDateFilterCriteria,
    });
    filterPurchaseApprovalOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDateFilterCriteria, endDateFilterCriteria]);

  useEffect(() => {
    console.group(PurchaseOrderPage.name);
    console.log("Sorting list after sort is set >>: ", {
      sortCriteria,
    });
    sortPurchaseApprovalOrderByDate(sortCriteria);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortCriteria]);

  const getPurchaseApprovalOrdersProgress = (purchaseApprovalOrders: IPurchaseApprovalOrder[]) => {
    const purchaseApprovalOrderProgress = purchaseApprovalOrders.map(purchaseApprovalOrder => {
      const incompletePO = purchaseApprovalOrder.purchaseOrders.filter(purchaseOrder => !(purchaseOrder.emailed || purchaseOrder.downloaded) )
      purchaseApprovalOrder.completed = incompletePO.length === 0;
      return purchaseApprovalOrder;
    })
    return purchaseApprovalOrderProgress;
  };

  const search = () => {
    if (selectedPurchaseApprovalOrder) {
      const filteredData = searchEngine.updateEngine(selectedPurchaseApprovalOrder.purchaseOrders ?? []).search(searchText);
      setFilteredPurchaseOrders(filteredData);
    }
  };

  const filterByDateRange = (startDate?: string, endDate?: string) => {
    const startDateValue= startDate === undefined ? startDate : new Date(new Date(startDate).setHours(0, 0, 0, 0));
    setStartDateFilterCriteria(startDateValue);
    const endDateValue = endDate === undefined ? endDate : new Date(new Date(endDate).setHours(23, 59, 59, 59))
    setEndDateFilterCriteria(endDateValue);
    filterPurchaseApprovalOrders();
  };

  const filterPurchaseApprovalOrders = () => {
    const filteredResult: IPurchaseApprovalOrder[] = [];
    purchaseApprovalOrders?.forEach(purchaseApprovalOrder => {
      const purchaseApprovalOrderCreatedDate = new Date(purchaseApprovalOrder.createdDate);
      if (startDateFilterCriteria !== undefined && purchaseApprovalOrderCreatedDate < startDateFilterCriteria) {
      } else if (endDateFilterCriteria !== undefined && purchaseApprovalOrderCreatedDate > endDateFilterCriteria) {
      } else {
        filteredResult.push(purchaseApprovalOrder);
      }
    });
    console.log("Filtered result >>:", filteredResult);
    console.groupEnd();
    setFilteredPurchaseApprovalOrders(filteredResult);
  };

  const sortPurchaseApprovalOrderByDate = (sort: Sort) => {
    setSortCriteria(sort);
    filteredPurchaseApprovalOrders?.sort((purchaseApprovalOrder1, purchaseApprovalOrder2) => {
      if (sort === Sort.ASC) {
        return purchaseApprovalOrder1.createdDate < purchaseApprovalOrder2.createdDate ? -1 : 1;
      } else if (sort === Sort.DES) {
        return purchaseApprovalOrder1.createdDate > purchaseApprovalOrder2.createdDate ? -1 : 1;
      }
      return 0;
    })
  };

  const resetSortingAndFilter = () => {
    setFilteredPurchaseApprovalOrders(purchaseApprovalOrders);

    setStartDateFilterCriteria(undefined);
    setEndDateFilterCriteria(undefined);
    setSortCriteria(Sort.DES);
    sortPurchaseApprovalOrderByDate(Sort.DES);

    filterPurchaseApprovalOrders();
    popNotification("Success Reset Sorting & Filtering", NotificationType.success);
  };

  return (
    <>
      <div className="container-fluid h-100">
        <div>
          <div className="mb-2 w-100">
            <Title className="d-inline-block" level={4}>Purchase Order Download &#38; Email to Vendors</Title>
          </div>
          <div className="d-inline-flex flex-row align-items-center" style={{ gap: "15px", width: "max-content" }}>
            <label>Advance Sorting / Filtering</label>
            <DatePicker.RangePicker 
              format="DD/MM/YYYY" 
              allowEmpty={[true, true]}
              value={[startDateFilterCriteria === undefined ? null : moment(startDateFilterCriteria), endDateFilterCriteria === undefined ? null : moment(endDateFilterCriteria)]}
              onChange={(dateValues) => filterByDateRange(dateValues != null ? dateValues[0]?.toString() : undefined, dateValues != null ? dateValues[1]?.toString() : undefined)}
            />
            <Select key="sort-submission-request-select" value={sortCriteria} onChange={(value) => sortPurchaseApprovalOrderByDate(value)}>
              <Select.Option value={Sort.DES}>Created Date Desc</Select.Option>
              <Select.Option value={Sort.ASC}>Created Date Asc</Select.Option>
            </Select>
            <Button className="d-inline-flex align-items-center" onClick={resetSortingAndFilter}>
              <ReloadOutlined />
              Reset
            </Button>
          </div>
          {/* Exploring on PDF Download [WIP] */}
          {/* <PDFDownloadLink document={<PurchaseOrderTemplate 
            purchaseOrderDate="11/10/2021" 
            purchaseOrderNumber="PO-27392" 
            purchaseOrderVendorAddressLine1="No 123" 
            purchaseOrderVendorAddressLine2="Taman A" 
            purchaseOrderVendorName="Vendor ABC"
            purchaseOrderItems={[{
              id: 2,
              componentCode: 2,
              componentName: "Component BBB",
              packagingSize: 90,
              noOfPacks: 10,
              quantity: 900,
              deliveryDate: new Date(),
              purchaseOrderId: 2,
              itemCost: 2.5,
            }]} />}
            style={{ height: "100vh", width: "100%" }}>
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'Download now!'
            }
          </PDFDownloadLink> */}
          <div className="mx-2 d-inline-flex border-top mt-4 w-100">
            <div className="my-3 mb-2" style={{ alignContent: "start", maxHeight: "500px" }}>
              <PurchaseOrderBrowser
                setSelectedPurchaseApprovalOrder={setSelectedPurchaseApprovalOrder} 
                purchaseApprovalOrders={filteredPurchaseApprovalOrders ?? []}
                setFilteredPurchaseOrders={setFilteredPurchaseOrders}
              />
            </div>
            <div className="my-2 mx-4 position-relative w-100">
              <span>
                Submission Date: <b color="primary">{selectedPurchaseApprovalOrder ? convertToLocalString(selectedPurchaseApprovalOrder.createdDate) : ""}</b>
              </span>
              <div className="d-flex flex-column justify-content-center">
                <Input.Search
                  allowClear
                  placeholder="Search"
                  bordered={false}
                  value={searchText}
                  onChange={(e: any) => setSearchText(e.target.value)}
                  onSearch={search}
                  style={{
                    width: "40%",
                    borderBottom: "1px solid #d9d9d9",
                    position: "absolute",
                    right: "5px"
                  }}
                />
              </div>
              <PurchaseOrderTable currentPurchaseApprovalOrderRecord={selectedPurchaseApprovalOrder} filteredItems={filteredPurchaseOrders} />
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseOrderPage;
