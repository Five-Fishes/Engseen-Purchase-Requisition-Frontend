import { useState } from "react";
import { Input, Button, Select } from "antd";
import Title from "antd/lib/typography/Title";
import { IPurchaseRequisitionRequest } from "@dto/i-purchase-requisition-request.dto";
import { ArrowRightOutlined, ReloadOutlined } from "@ant-design/icons";
import PurchaseRequisitionSubmissionTable from "../components/submission-table";
import PurchaseRequisitionSubmissionBrowser from "../components/submission-record-browser";
import { SearchEngine } from "@utils/search/native-search";
import { genereateIndex } from "../components/submission-indexer";
import { IPurchaseRequisitionRequestItem } from "@dto/i-purchase-requisition-request-item.dto";
import { convertToLocalString } from "@utils/date-time/date-time-format";
import { Sort } from "@constant/sort.enum";
import { useEffect } from "react";
import { getPurchaseRequisitionRequest } from "@api/purchase-requisition-request.api";
import { ApiResponseStatus } from "@constant/api-status";

const PurchaseRequisitionSubmissionPage: React.FC = () => {
  const [purchaseRequisitionSubmissios, setPurchaseRequisitionSubmissions] = useState<IPurchaseRequisitionRequest[]>();
  const [filteredPurchaseRequisitionSubmissios, setFilteredPurchaseRequisitionSubmissions] = useState<IPurchaseRequisitionRequest[]>();
  const [selectedSubmissionRequest, setSelectedSubmissionRequest] = useState<IPurchaseRequisitionRequest>({} as IPurchaseRequisitionRequest);
  const [filteredSubmissionItems, setFilteredSubmissionItems] = useState<IPurchaseRequisitionRequestItem[]>();
  const [searchText, setSearchText] = useState<string>("");
  const searchEngine: SearchEngine<IPurchaseRequisitionRequestItem> = new SearchEngine([], genereateIndex);
  const [startDateFilterCriteria, setStartDateFilterCriteria] = useState<Date>();
  const [endDateFilterCriteria, setEndDateFilterCriteria] = useState<Date>();
  const [sortCriteria, setSortCriteria] = useState<Sort>(Sort.DES);

  useEffect(() => {
    const getSubmissions = async () => {
      const apiResponse = await getPurchaseRequisitionRequest(new Date(), new Date(), Sort.ASC);

      if (apiResponse && apiResponse.status === ApiResponseStatus.SUCCESS) {
        setPurchaseRequisitionSubmissions(apiResponse.data);
        setFilteredPurchaseRequisitionSubmissions(apiResponse.data);
      }
    };

    getSubmissions();
  }, []);

  useEffect(() => {
    console.log('Filtering list after filters are set >>: ', {startDateFilterCriteria, endDateFilterCriteria, sortCriteria});
    filterSubmissionRequest();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDateFilterCriteria, endDateFilterCriteria, sortCriteria])

  const search = () => {
    const filteredData = searchEngine.updateEngine(selectedSubmissionRequest.purchaseRequisitionRequestItems).search(searchText);
    setFilteredSubmissionItems(filteredData);
  };

  const filterStartDate = (startDate: string) => {
    setStartDateFilterCriteria(new Date(startDate));
  };

  const filterEndDate = (endDate: string) => {
    setEndDateFilterCriteria(new Date(endDate));
  };

  const filterSubmissionRequest = () => {
    const filteredResult: IPurchaseRequisitionRequest[] = [];
    purchaseRequisitionSubmissios?.forEach(submission => {
      const submissionCreatedDate = new Date(submission.createdDate);
      if (startDateFilterCriteria !== undefined && submissionCreatedDate < startDateFilterCriteria) {
      } else if (endDateFilterCriteria !== undefined && submissionCreatedDate > endDateFilterCriteria) {
      } else {
        filteredResult.push(submission);
      }
    });
    console.log('Filtered result >>:', filteredResult);
    setFilteredPurchaseRequisitionSubmissions(filteredResult);
  };

  const sortDate = (sort: Sort) => {
    setSortCriteria(sort);
    filteredPurchaseRequisitionSubmissios?.sort((submission1, submission2) => {
      if (sort === Sort.ASC) {
        return submission1.createdDate < submission2.createdDate ? -1 : 1;
      } else if (sort === Sort.DES) {
        return submission1.createdDate > submission2.createdDate ? -1 : 1;
      }
      return 0;
    })
  };

  const resetSortingAndFilter = () => {
    setFilteredPurchaseRequisitionSubmissions(purchaseRequisitionSubmissios);
    setStartDateFilterCriteria(undefined);
    setEndDateFilterCriteria(undefined);
    filterSubmissionRequest();

    setSortCriteria(Sort.DES);
    sortDate(Sort.DES);
  }

  return (
    <>
      <div className="container-fluid h-100">
        <div>
          <div className="mb-2 w-100">
            <Title className="d-inline-block" level={4}>Purchase Requisition Submission Record</Title>
            <Button className="d-inline-flex align-items-center float-end back-button"
              role="link" href="/purchase-requisition-request">
              <span>Purchase Requisition</span>
              <ArrowRightOutlined />
            </Button>
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
              <PurchaseRequisitionSubmissionBrowser
                setSelectedSubmissionRecord={setSelectedSubmissionRequest}
                purchaseRequisitionSubmissios={filteredPurchaseRequisitionSubmissios ?? []} />
            </div>
            <div className="my-2 mx-4 position-relative">
              <span hidden={selectedSubmissionRequest === undefined}>
                Submission Date: <b color="primary">{convertToLocalString(selectedSubmissionRequest?.createdDate)}</b>
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
              <PurchaseRequisitionSubmissionTable
              currentSubmissionRecord={selectedSubmissionRequest}
              filteredItems={filteredSubmissionItems} />
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseRequisitionSubmissionPage;
